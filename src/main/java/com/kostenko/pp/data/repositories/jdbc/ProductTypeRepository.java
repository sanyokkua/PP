package com.kostenko.pp.data.repositories.jdbc;

import com.google.common.collect.Lists;
import com.kostenko.pp.data.pojos.ProductType;
import com.kostenko.pp.data.repositories.CrudExtensions;
import com.kostenko.pp.data.repositories.CrudRepository;
import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BatchPreparedStatementSetter;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;
import javax.transaction.Transactional;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.List;

import static java.util.Objects.nonNull;

@Repository
@Transactional
@Slf4j
public class ProductTypeRepository implements CrudRepository<ProductType>, CrudExtensions<ProductType> {
    private static final RowMapper<ProductType> ROW_MAPPER = (resultSet, i) -> ProductType.builder().prodTypeId(resultSet.getLong("prod_type_id")).prodTypeName(resultSet.getString("name")).build();
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public ProductTypeRepository(@NonNull @Nonnull JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Nullable
    @Override
    public ProductType create(@Nonnull @NonNull ProductType entity) {
        String sql = "insert into pp_app.prod_type (name) values (?)";
        jdbcTemplate.update(sql, entity.getProdTypeName().toUpperCase());
        return findByField(entity.getProdTypeName().toUpperCase());
    }

    @Nullable
    @Override
    public ProductType update(@Nonnull @NonNull ProductType entity) {
        String sql = "update pp_app.prod_type set name=? where prod_type_id=?";
        jdbcTemplate.update(sql, entity.getProdTypeName().toUpperCase(), entity.getProdTypeId());
        return findByField(entity.getProdTypeName().toUpperCase());
    }

    @Override
    public boolean delete(@Nonnull @NonNull Long id) {
        String sql = "delete from pp_app.prod_type where prod_type_id=?";
        int update = jdbcTemplate.update(sql, id);
        return update > 0;
    }

    @Nullable
    @Override
    public ProductType find(@Nonnull @NonNull Long id) {
        String sql = "select * from pp_app.prod_type t where t.prod_type_id = ?";
        return CrudRepository.getNullableResultIfException(() -> jdbcTemplate.queryForObject(sql, ROW_MAPPER, id)).orElse(null);
    }

    @Override
    public List<ProductType> findAll() {
        String sql = "select * from pp_app.prod_type t ";
        return jdbcTemplate.query(sql, ROW_MAPPER);
    }

    @Override
    public void createAll(Iterable<ProductType> entities) {
        final int batchSize = 100;
        List<List<ProductType>> batchLists = Lists.partition(Lists.newArrayList(entities), batchSize);
        for (List<ProductType> batch : batchLists) {
            String sql = "insert into pp_app.prod_type (name) values (?)";
            jdbcTemplate.batchUpdate(sql, new BatchPreparedStatementSetter() {
                @Override
                public void setValues(@Nonnull PreparedStatement ps, int i) throws SQLException {
                    ProductType product = batch.get(i);
                    ps.setString(1, product.getProdTypeName().toUpperCase());
                }

                @Override
                public int getBatchSize() {
                    return batch.size();
                }
            });
        }
    }

    @Override
    public boolean delete(@Nonnull @NonNull ProductType entity) {
        return delete(entity.getProdTypeId());
    }

    @Nullable
    @Override
    public ProductType find(@Nonnull @NonNull ProductType entity) {
        return findByField(entity.getProdTypeName());
    }

    @Nullable
    @Override
    public ProductType findByField(@NonNull String fieldValue) {
        if (StringUtils.isBlank(fieldValue)) {
            return null;
        }
        String sql = "select * from pp_app.prod_type t where t.name = ?";
        return CrudRepository.getNullableResultIfException(() -> jdbcTemplate.queryForObject(sql, ROW_MAPPER, fieldValue.toUpperCase())).orElse(null);
    }

    @Override
    public boolean isExistsId(@Nonnull @NonNull Long id) {
        String sql = "select count(prod_type_id) from pp_app.prod_type where prod_type_id = ?";
        long numberOfRows = jdbcTemplate.queryForObject(sql, (rs, rowNum) -> rs.getLong(1), id);
        return numberOfRows > 0;
    }

    @Override
    public boolean isExists(@Nonnull @NonNull ProductType entity) {
        return nonNull(findByField(entity.getProdTypeName().toUpperCase()));
    }
}
