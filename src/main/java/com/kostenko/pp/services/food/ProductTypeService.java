package com.kostenko.pp.services.food;

import com.google.common.base.Preconditions;
import com.kostenko.pp.data.entities.ProductType;
import com.kostenko.pp.data.repositories.food.ProductRepository;
import com.kostenko.pp.data.repositories.food.ProductTypeRepository;
import com.kostenko.pp.services.DBService;
import com.kostenko.pp.services.page.PageInfo;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.Objects;

@Slf4j
@Service
@org.springframework.transaction.annotation.Transactional
public class ProductTypeService implements DBService<ProductType> {
    private final ProductTypeRepository productTypeRepository;
    private final ProductRepository productRepository;

    @PersistenceContext
    private EntityManager em;

    @Autowired
    public ProductTypeService(ProductTypeRepository productTypeRepository, ProductRepository productRepository) {
        this.productTypeRepository = Objects.requireNonNull(productTypeRepository, "Instead of ProductTypeRepository instance injected null");
        this.productRepository = Objects.requireNonNull(productRepository, "Instead of ProductRepository instance injected null");
    }

    @Override
    public ProductType findById(Long id) {
        Preconditions.checkNotNull(id, "ID can't be null");
        return productTypeRepository.findById(id).orElse(null);
    }

    @Override
    public ProductType create(ProductType data) {
        ProductType dbProductType = productTypeRepository.findByName(data.getName());
        if (dbProductType == null) {
            dbProductType = productTypeRepository.save(data);
        } else {
            throw new IllegalArgumentException("Type already exists");
        }
        return dbProductType;
    }

    @Override
    public ProductType update(ProductType data) {
        ProductType dbProductType = productTypeRepository.findById(data.getProdTypeId()).orElse(null);
        if (dbProductType == null) {
            throw new IllegalArgumentException("ProductType with id " + data.getProdTypeId() + " doesn't exists. Update can't be done");
        } else {
            dbProductType = productTypeRepository.save(data);
        }
        return dbProductType;
    }

    @Override
    public ProductType createOrUpdate(ProductType data) {
        ProductType result = null;
        if (data.getProdTypeId() != null) {
            result = productTypeRepository.findById(data.getProdTypeId()).orElse(null);
        } else if (StringUtils.isNotBlank(data.getName())) {
            result = productTypeRepository.findByName(data.getName());
        }
        if (result != null) {
            result = save(data);
        } else {
            throw new IllegalArgumentException("ProductType with id " + data.getProdTypeId() + " doesn't exists. Update can't be done");
        }
        return result;
    }

    @Override
    public Page<ProductType> getAll(PageInfo pageInfo) {
        return productTypeRepository.findAll(PageRequest.of(0, Integer.MAX_VALUE));
    }

    @Override
    public void delete(ProductType data) {
        final ProductType exProd = productTypeRepository.findById(data.getProdTypeId()).orElse(null);
        if (exProd == null) {
            throw new IllegalArgumentException("ProductType with id " + data.getProdTypeId() + " doesn't exists. Delete can't be done");
        } else {
            long numberOfRecordsWithType = productRepository.countAllByProductType(data);
            if (numberOfRecordsWithType < 1) {
                productTypeRepository.delete(exProd);
            } else {
                throw new IllegalArgumentException("Type can't be deleted till it in use");
            }
        }
    }

    @Transactional
    public ProductType save(ProductType productType){
        ProductType merge = em.merge(productType);
        em.clear();
        return merge;
    }
}
