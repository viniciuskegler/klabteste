package com.example.demo.models;

import com.example.demo.exceptions.webservice.BadRequestException;
import com.example.demo.exceptions.webservice.InternalServerErrorException;
import com.example.demo.interfaces.Produtos;
import com.example.demo.services.NativeScriptService;
import com.example.demo.utils.database.DbConnHelper;
import jakarta.persistence.PersistenceException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.sql.Connection;
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
        } catch (RuntimeException | SQLException e) {
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
        Double preco = (Double) product.get("preco");
        BigDecimal precoConvertido = preco != null ? BigDecimal.valueOf(preco) : BigDecimal.ZERO;

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
        } catch (RuntimeException | SQLException e) {
            throw new InternalServerErrorException("Erro ao inserir produto no banco de dados: " + e.getMessage());
        } finally {
            connectionHelper.closeCon(pstm);
        }
    }

}
