package com.kostenko.pp.data;

import lombok.NonNull;
import lombok.ToString;
import org.springframework.data.domain.Page;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

import static java.util.Objects.isNull;

public interface PageableSearch<T> {
    int DEFAULT_PAGE_SIZE = 10;

    Page<T> findAll(@Nonnull @NonNull SearchParams searchParams);

    default Integer getDbPageNumber(@Nullable Integer uiPageNumber) {
        int page = Objects.nonNull(uiPageNumber) && uiPageNumber >= 0 ? uiPageNumber : 0;
        return page > 0 ? page - 1 : page;
    }

    default Integer getRecordsPerPage(@Nullable Integer recordsPerPage) {
        return Objects.nonNull(recordsPerPage) && recordsPerPage > 0 ? recordsPerPage : DEFAULT_PAGE_SIZE;
    }

    @ToString
    class SearchParams<T> {
        private Map<String, T> entities = new HashMap<>();
        private Map<String, Long> longs = new HashMap<>();
        private Map<String, Integer> ints = new HashMap<>();
        private Map<String, String> strings = new HashMap<>();

        public SearchParams add(@Nonnull @NonNull String key, T value, boolean isNotRequired) {
            add(entities, key, value, isNotRequired);
            return this;
        }

        private static <K, V> void add(Map<K, V> map, K key, V value, boolean isNotRequired) { // null | object -> null && skip | null && !skip | object && skip | object && !skip
            //noinspection StatementWithEmptyBody
            if (isNotRequired && isNull(value)) {

            } else {
                map.put(key, Objects.requireNonNull(value));
            }
        }

        public SearchParams add(@Nonnull @NonNull String key, Long value, boolean isNotRequired) {
            add(longs, key, value, isNotRequired);
            return this;
        }

        public SearchParams add(@Nonnull @NonNull String key, Integer value, boolean isNotRequired) {
            add(ints, key, value, isNotRequired);
            return this;
        }

        public SearchParams add(@Nonnull @NonNull String key, String value, boolean isNotRequired) {
            add(strings, key, value, isNotRequired);
            return this;
        }

        @Nullable
        public T getEntity(@Nonnull @NonNull String key) {
            return entities.getOrDefault(key, null);
        }

        @Nullable
        public Long getLong(@Nonnull @NonNull String key) {
            return longs.getOrDefault(key, null);
        }

        @Nullable
        public Integer getInt(@Nonnull @NonNull String key) {
            return ints.getOrDefault(key, null);
        }

        @Nullable
        public String getString(@Nonnull @NonNull String key) {
            return strings.getOrDefault(key, null);
        }

        public void checkRequiredParams(@Nonnull @NonNull String... params) {
            for (String param : params) {
                if (!hasParam(param)) {
                    throw new IllegalArgumentException("Param: " + param + " is absent");
                }
            }
        }

        boolean hasParam(@Nonnull @NonNull String key) {
            return entities.containsKey(key) || longs.containsKey(key) || strings.containsKey(key);
        }
    }
}
