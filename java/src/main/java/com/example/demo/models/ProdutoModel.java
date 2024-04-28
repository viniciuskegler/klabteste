package com.example.demo.models;

import com.example.demo.exceptions.database.DatabaseConnectionException;
import com.example.demo.exceptions.webservice.BadRequestException;
import com.example.demo.exceptions.webservice.InternalServerErrorException;
import com.example.demo.exceptions.webservice.ObjectNotFoundException;
import com.example.demo.interfaces.Produtos;
import com.example.demo.services.NativeScriptService;
import com.example.demo.utils.database.DbConnHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/*
 * Construa suas regras de negócio da forma que for necessária.
 * Se basear nos exemplos abaixo, complementando-os, ou até mesmo melhorando-os.
 * As operações no devem ser feitas por meio de strings SQL.
 */
@Service
public class ProdutoModel implements Produtos {


    @Autowired
    private NativeScriptService nativeScriptService;

    @Autowired
    private DbConnHelper connectionHelper;

    public Object getAllProducts() throws RuntimeException {
        List<Map<String, Object>> listMap = new ArrayList<>();
        StringBuilder sql = new StringBuilder("SELECT * FROM produtos;");
        PreparedStatement pstm = null;
        try {
            pstm = connectionHelper.getPreparedStatement(nativeScriptService, sql.toString());
            ResultSet rs = pstm.executeQuery();
            while (rs.next()) {
                Map<String, Object> map = new HashMap<>();
                map.put("id", rs.getObject("id"));
                map.put("nome", rs.getObject("nome"));
                map.put("quantidades", rs.getObject("quantidades"));
                map.put("defeitos", rs.getObject("defeitos"));
                map.put("preco", rs.getObject("preco"));
                listMap.add(map);
            }
            rs.close();
            return listMap;
        } catch (DatabaseConnectionException | SQLException e) {
            throw new InternalServerErrorException("Erro ao consultar produtos no banco de dados: " + e.getMessage());
        } finally {
            connectionHelper.closeCon(pstm);
        }
    }

    public void insertProduct(Map<String, Object> product) throws RuntimeException {
        String sqlInsertProdutos = "INSERT INTO PRODUTOS(NOME, QUANTIDADES, DEFEITOS, PRECO) VALUES (?, ?, ?, ?)";
        PreparedStatement pstm = null;

        String nome = (String) product.get("nome");
        Integer quantidades = (Integer) product.get("quantidades");
        Integer defeitos = (Integer) product.get("defeitos");
        String preco = (String) product.get("preco");
        BigDecimal precoConvertido = preco != null ? new BigDecimal(preco) : BigDecimal.ZERO;

        //Não abre a conexão se o payload é invalido.
        if (nome == null || quantidades == null | preco == null) {
            throw new BadRequestException("Invalid payload");
        }
        try {
            pstm = connectionHelper.getPreparedStatement(nativeScriptService, sqlInsertProdutos);
            pstm.setString(1, nome);
            pstm.setInt(2, quantidades);
            pstm.setInt(3, defeitos);
            pstm.setBigDecimal(4, precoConvertido);
            pstm.executeUpdate();
        } catch (DatabaseConnectionException | SQLException e) {
            throw new InternalServerErrorException("Erro ao inserir produto no banco de dados: " + e.getMessage());
        } finally {
            connectionHelper.closeCon(pstm);
        }
    }

    @Override
    public Object getProductById(int id) throws RuntimeException {
        Map<String, Object> produto;
        String sql = "SELECT * FROM PRODUTOS P WHERE P.ID = " + id;
        PreparedStatement pstm = null;
        try {
            pstm = connectionHelper.getPreparedStatement(nativeScriptService, sql);
            ResultSet rs = pstm.executeQuery();
            if (rs.next()) {
                produto = new HashMap<>();
                produto.put("id", rs.getObject("id"));
                produto.put("nome", rs.getObject("nome"));
                produto.put("quantidades", rs.getObject("quantidades"));
                produto.put("defeitos", rs.getObject("defeitos"));
                produto.put("preco", rs.getObject("preco"));
            } else {
                throw new ObjectNotFoundException("Produto com o id solicitado não encontrado.");
            }
            rs.close();
            return produto;
        } catch (DatabaseConnectionException | SQLException e) {
            throw new InternalServerErrorException("Erro ao consultar produto no banco de dados: " + e.getMessage());
        } finally {
            connectionHelper.closeCon(pstm);
        }
    }

    @Override
    public void updateProductQuantity(int id, Map<String, Object> product) throws RuntimeException {
        String sqlInsertProdutos = "UPDATE PRODUTOS SET QUANTIDADES = ? WHERE ID = ?";
        PreparedStatement pstm = null;

        //Verifica se existe
        Map<String, Object> produtoPesq = (Map<String, Object>) getProductById(id);

        Integer quantidades = (Integer) product.get("quantidades");
        //Não abre a conexão se o payload é invalido.
        if (quantidades == null || quantidades <= 0) {
            throw new BadRequestException("Payload inválido");
        }
        try {
            pstm = connectionHelper.getPreparedStatement(nativeScriptService, sqlInsertProdutos);
            pstm.setInt(1, quantidades);
            pstm.setInt(2, id);
            updateProduct(pstm);
        } catch ( SQLException e) {
            throw new InternalServerErrorException("Erro ao atualizar produto no banco de dados: " + e.getMessage());
        }
    }

    @Override
    public void updateProductPriceDefects(int id, Map<String, Object> data) throws RuntimeException {
        String sqlInsertProdutos = "UPDATE PRODUTOS SET DEFEITOS = ?, PRECO = ? WHERE ID = ?";
        PreparedStatement pstm = null;
        //Verifica se existe
        Map<String, Object> produtoPesq = (Map<String, Object>) getProductById(id);
        BigDecimal precoAtual = (BigDecimal) produtoPesq.get("preco");

        Integer defeitos = (Integer) data.get("defeitos");
        String preco = (String) data.get("preco");
        BigDecimal precoConvertido = preco != null ? new BigDecimal(preco) : BigDecimal.ZERO;

        //Não abre a conexão se o payload é invalido.
        if ((defeitos == null || defeitos <= 0) || precoConvertido.compareTo(BigDecimal.ZERO) == 0) {
            throw new BadRequestException("Payload inválido");
        }

        //Cliente não reduz os preços.
        if(precoConvertido.compareTo(precoAtual) < 0){
            throw new BadRequestException("O preço novo não pode ser menor que o atual.");
        }

        try {
            pstm = connectionHelper.getPreparedStatement(nativeScriptService, sqlInsertProdutos);
            pstm.setInt(1, defeitos);
            pstm.setBigDecimal(2, precoConvertido);
            pstm.setInt(3, id);
            updateProduct(pstm);
        } catch (DatabaseConnectionException | SQLException e) {
            throw new InternalServerErrorException("Erro ao atualizar produto no banco de dados: " + e.getMessage());
        }
    }

    private void updateProduct(PreparedStatement pstm) throws RuntimeException {
        try {
             pstm.executeUpdate();
        } catch (DatabaseConnectionException | SQLException e) {
            throw new InternalServerErrorException("Erro ao atualizar produto no banco de dados: " + e.getMessage());
        } finally {
            connectionHelper.closeCon(pstm);
        }
    }

}
