package com.example.demo.webservices;
import com.example.demo.interfaces.Produtos;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/produtos")
public class ProdutosWs {

    @Autowired
    private Produtos produtos;

    @GetMapping()
    public ResponseEntity<Object> getAllProducts() {
        return ResponseEntity.ok(produtos.getAllProducts());
    }

    @PostMapping()
    public ResponseEntity<?> createProduct(@RequestBody Map<String, Object> product) {
        produtos.insertProduct(product);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}
