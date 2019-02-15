package com.kostenko.pp.data.repositories.food;

import com.kostenko.pp.data.entities.Product;
import com.kostenko.pp.data.entities.ProductType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductJpaRepository extends JpaRepository<Product, Long> {
    Product findByName(String name);
    Page<Product> findAllByNameIsContaining(Pageable pageable, String name);
    Page<Product> findAllByProductType(Pageable pageable, ProductType productType);
    Page<Product> findAllByNameIsContainingAndProductType(Pageable pageable, String name, ProductType productType);

    
    void createProduct(String name, Double energy, Long amount, Long prod_type_id);

}
