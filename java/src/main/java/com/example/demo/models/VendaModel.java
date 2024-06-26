package com.example.demo.models;

import com.example.demo.exceptions.database.DatabaseConnectionException;
import com.example.demo.exceptions.webservice.BadRequestException;
import com.example.demo.exceptions.webservice.InternalServerErrorException;
import com.example.demo.interfaces.Produtos;
import com.example.demo.interfaces.Vendas;
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
public class VendaModel implements Vendas {


    @Autowired
    private NativeScriptService nativeScriptService;

    @Autowired
    private DbConnHelper connectionHelper;

    @Autowired
    private Produtos produtos;

    @Override
    public Object getAllSales() throws RuntimeException {
        List<Map<String, Object>> listMap = new ArrayList<>();
        String sql = "SELECT * FROM VENDAS;";
        PreparedStatement pstm = null;
        try {
            pstm = connectionHelper.getPreparedStatement(nativeScriptService, sql.toString());
            ResultSet rs = pstm.executeQuery();
            while (rs.next()) {
                Map<String, Object> map = new HashMap<>();
                map.put("id", rs.getObject("id"));
                map.put("comprador", rs.getObject("comprador"));
                map.put("produtoId", rs.getObject("produto_id"));
                map.put("quantidades", rs.getObject("quantidades"));
                map.put("totalVenda", rs.getObject("total_venda"));
                listMap.add(map);
            }
            rs.close();
            return listMap;
        } catch (DatabaseConnectionException | SQLException e) {
            throw new InternalServerErrorException("Erro ao consultar vendas no banco de dados: " + e.getMessage());
        } finally {
            connectionHelper.closeCon(pstm);
        }
    }

    @Override
    public Object getAllSalesByProduct(int productId) throws RuntimeException {
        List<Map<String, Object>> listMap = new ArrayList<>();
        String sql = "SELECT * FROM VENDAS V WHERE V.PRODUTO_ID = " + productId;
        PreparedStatement pstm = null;
        try {
            pstm = connectionHelper.getPreparedStatement(nativeScriptService, sql.toString());
            ResultSet rs = pstm.executeQuery();
            while (rs.next()) {
                Map<String, Object> map = new HashMap<>();
                map.put("id", rs.getObject("id"));
                map.put("comprador", rs.getObject("comprador"));
                map.put("produtoId", rs.getObject("produto_id"));
                map.put("quantidades", rs.getObject("quantidades"));
                map.put("totalVenda", rs.getObject("total_venda"));
                listMap.add(map);
            }
            rs.close();
            return listMap;
        } catch (DatabaseConnectionException | SQLException e) {
            throw new InternalServerErrorException("Erro ao consultar vendas no banco de dados: " + e.getMessage());
        } finally {
            connectionHelper.closeCon(pstm);
        }
    }

    @Override
    public void insertSale(Map<String, Object> sale) throws RuntimeException {
        String sqlInsertVenda = "INSERT INTO VENDAS(COMPRADOR, PRODUTO_ID, QUANTIDADES, TOTAL_VENDA) VALUES (?, ?, ?, ?)";
        PreparedStatement pstm = null;

        String comprador = (String) sale.get("comprador");
        Integer produtoID = (Integer) sale.get("produtoId");
        Integer quantidades = (Integer) sale.get("quantidades");
        String totalVenda = (String) sale.get("totalVenda");
        BigDecimal totalConvertido = totalVenda != null ? new BigDecimal(totalVenda) : BigDecimal.ZERO;

        //Calcula qual a quantidade após a venda e valida se o produto existe.
        Map<String, Object> produto = (Map<String, Object>) produtos.getProductById(produtoID);
        Map<String, Object> qtdeNova = new HashMap<>();
        qtdeNova.put("quantidades", ((Integer) produto.get("quantidades")) - quantidades);

        //Não abre a conexão se o payload é invalido.
        if (comprador == null || quantidades == null | totalVenda == null) {
            throw new BadRequestException("Invalid payload");
        }
        try {
            pstm = connectionHelper.getPreparedStatement(nativeScriptService, sqlInsertVenda);

            //Não pode registrar a venda sem atualizar os produtos e vice-versa;
            pstm.getConnection().setAutoCommit(false);

            pstm.setString(1, comprador);
            pstm.setInt(2, produtoID);
            pstm.setInt(3, quantidades);
            pstm.setBigDecimal(4, totalConvertido);
            pstm.executeUpdate();
            produtos.updateProductQuantity(produtoID, qtdeNova);

            //Commita somente após o update dos produtos dar certo
            pstm.getConnection().commit();
        } catch (DatabaseConnectionException | SQLException e) {
            try {
                //Cancela o insert da venda se qualquer erro acontecer.
                pstm.getConnection().rollback();
            } catch (SQLException e2) {
                throw new InternalServerErrorException("Erro ao dar rollback na transação");
            }
            throw new InternalServerErrorException("Erro ao inserir produto no banco de dados: " + e.getMessage());
        } finally {
            connectionHelper.closeCon(pstm);
        }
    }
}
