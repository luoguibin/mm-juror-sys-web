```
SELECT
  COLUMN_NAME 列名,
  COLUMN_TYPE 数据类型,
  DATA_TYPE 字段类型,
  CHARACTER_MAXIMUM_LENGTH 长度,
  IS_NULLABLE 是否为空,
  COLUMN_DEFAULT 默认值,
  COLUMN_COMMENT 备注
FROM
 INFORMATION_SCHEMA.COLUMNS
where
table_schema ='sghen_db'
AND
table_name  = 'user'
```