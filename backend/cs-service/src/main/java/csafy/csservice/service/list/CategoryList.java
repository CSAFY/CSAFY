package csafy.csservice.service.list;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

public class CategoryList {

    public static final Map<String, Integer> CATEGORY_LIST = createCategoryList();

    private static Map<String, Integer> createCategoryList() {
        Map<String, Integer> result = new HashMap<>();
        result.put("자료구조", 1);
        result.put("컴퓨터구조", 2);
        result.put("운영체제", 3);
        result.put("네트워크", 4);
        result.put("데이터베이스", 5);
        result.put("기타", 6);
        return Collections.unmodifiableMap(result);
    }

}
