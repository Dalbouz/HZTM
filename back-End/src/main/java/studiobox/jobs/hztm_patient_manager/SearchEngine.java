package studiobox.jobs.hztm_patient_manager;

import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import studiobox.jobs.hztm_patient_manager.exception.DataNotFound;
import studiobox.jobs.hztm_patient_manager.model.FilterDTO;

import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

@Component
public class SearchEngine {

    private static final Map<Class<?>, Map<String, Method>> METHOD_CACHE = new ConcurrentHashMap<>();

    public static <T> List<T> searchByFilters(List<T> items, Map<String, String> filters) {
        if (items == null || items.isEmpty() || filters == null || filters.isEmpty()) {
            return new ArrayList<>(items);
        }

        return items.stream()
                .filter(item -> matchesAllFilters(item, filters))
                .collect(Collectors.toList());
    }

    private static <T> boolean matchesAllFilters(T item, Map<String, String> filters) {
        return filters.entrySet().stream()
                .allMatch(entry -> {
                    String field = entry.getKey();
                    String filterValue = entry.getValue().trim().toLowerCase();

                    if (filterValue.isEmpty()) {
                        return true;
                    }

                    try {
                        String fieldValue = getFieldValue(item, field).toLowerCase();
                        return fieldValue.contains(filterValue);
                    } catch (Exception e) {
                        return false;
                    }
                });
    }

    private static <T> String getFieldValue(T item, String field) throws Exception {
        Class<?> clazz = item.getClass();
        Method getter = getGetterMethod(clazz, field);

        Object value = getter.invoke(item);
        return value != null ? value.toString() : "";
    }

    private static Method getGetterMethod(Class<?> clazz, String field) throws NoSuchMethodException {
        return METHOD_CACHE
                .computeIfAbsent(clazz, k -> new ConcurrentHashMap<>())
                .computeIfAbsent(field, k -> {
                    String methodName = "get" + capitalize(field);
                    Method method = null;
                    try {
                        method = clazz.getMethod(methodName);
                    } catch (NoSuchMethodException e) {
                        throw new RuntimeException(e);
                    }
                    if (!method.getReturnType().equals(void.class)) {
                        return method;
                    }
                    throw new DataNotFound("Getter not found for field: " + field);
                });
    }

    private static String capitalize(String str) {
        if (str == null || str.isEmpty()) {
            return str;
        }
        return str.substring(0, 1).toUpperCase() + str.substring(1);
    }

    public Map<String, String> convertFilters(List<FilterDTO> filters) {
        return filters.stream()
                .filter(f -> f.isActive() && StringUtils.hasText(f.getValue()))
                .collect(Collectors.toMap(
                        FilterDTO::getKey,
                        f -> f.getValue().trim().toLowerCase()
                ));
    }
}