package com.example.demo.models;

import com.example.demo.interfaces.Produtos;
import com.example.demo.services.NativeScriptService;
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

    public Object getAllProducts() throws SQLException {
        Connection con = null;
        PreparedStatement pstm = null;

        try {
            List<Map<String, Object>> listMap = new ArrayList<>();

            //Construção da string SQL
            StringBuilder sql = new StringBuilder();
            sql.append("SELECT * FROM produtos;");

            //Abertura da conexão com o banco e abertura da PreparedStatement para comunicação
            con = nativeScriptService.getConectionDb();
            pstm = nativeScriptService.getPreparedStatementDb(sql.toString(), con);

            //Conversão e retorno das informações
            ResultSet rs = pstm.executeQuery();
            while (rs.next()){
                Map<String,Object> map = new HashMap<>();
                map.put("id", rs.getObject("id"));
                map.put("nome", rs.getObject("nome"));
                map.put("quantidades", rs.getObject("quantidades"));
                map.put("defeitos", rs.getObject("defeitos"));
                map.put("preco", rs.getObject("preco"));
                listMap.add(map);
            }
            return listMap;
        } catch (SQLException e) {
            System.out.println("Erro ao consultar produtos: " + e.getMessage());
            e.printStackTrace();
            throw new SQLException("Erro ao consultar produtos no banco de dados.", e.getMessage());
        } finally {
            //Fechamento das conexões
            if(con != null){
                con.close();
            }
            if(pstm != null) {
                pstm.close();
            }
        }
    }

    public void insertProduct(Map<String, Object> product) throws SQLException {
        String sqlInsertProdutos = "INSERT INTO PRODUTOS(NOME, QUANTIDADES, DEFEITOS, PRECO) VALUES (?, ?, ?, ?)";
        Connection con = null;
        PreparedStatement pstm = null;
        try {
            con = nativeScriptService.getConectionDb();
            pstm = nativeScriptService.getPreparedStatementDb(sqlInsertProdutos, con);

            pstm.setString(1, (String) product.get("nome"));
            pstm.setInt(2, (Integer) product.get("quantidades"));
            pstm.setInt(3, (Integer) product.get("defeitos"));
            //Casta pra double e depois cria o bigdecimal
            pstm.setBigDecimal(4, BigDecimal.valueOf((Double) product.get("preco")));
            pstm.executeUpdate();

        } catch (Exception e) {
            System.out.println("Erro ao inserir produto: " + e.getMessage());
            e.printStackTrace();
            throw new SQLException("Erro ao inserir produto no banco de dados.", e.getMessage());
        } finally {
            if(con != null){
                con.close();
            }
            if(pstm != null) {
                pstm.close();
            }
        }
    }

}
