package com.example.demo.utils.database;

import com.example.demo.exceptions.webservice.InternalServerErrorException;
import com.example.demo.services.NativeScriptService;
import jakarta.persistence.PersistenceException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

@Component
public class DbConnHelper {

     public PreparedStatement getPreparedStatement(NativeScriptService service, String sql) throws RuntimeException {
        try {
            Connection con = service.getConectionDb();
            return service.getPreparedStatementDb(sql, con);
        } catch (SQLException ex) {
            ex.printStackTrace();
            throw new RuntimeException("Erro ao abrir conexões com o banco");
        }
    }

    public void closeCon(PreparedStatement pstm) throws RuntimeException {
        try {
            if(pstm != null && !pstm.getConnection().isClosed()){
                pstm.getConnection().close();
                pstm.close();
            }
        } catch (SQLException ex) {
            ex.printStackTrace();
            throw new RuntimeException("Erro ao fechar conexões com o banco");
        }
    }
}
