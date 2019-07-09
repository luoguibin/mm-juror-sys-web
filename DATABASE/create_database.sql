CREATE DATABASE erm DEFAULT CHARACTER SET utf8 COLLATE utf8_bin ;

use database erm;

create table account(
id INT PRIMARY KEY AUTO_INCREMENT comment '账号ID',
account varchar(100) comment '账号名',
passwd varchar(200) comment '账号密码',
privs_id int comment '账号权限'
);

ALTER TABLE account COMMENT '系统账号配置表';

insert into account values(1,'admin',999);
insert into account values(2,'rw',1);
insert into account values(3,'ro',2);

create table account_privs(
privs_id int PRIMARY KEY,
privs varchar(10) comment '权限'
);

ALTER TABLE account_privs COMMENT '权限配置表';

insert into account_privs values(999,'系统管理员');
insert into account_privs values(1,'普通读写权限');
insert into account_privs values(2,'只读权限');

create table employee_info(
id int PRIMARY KEY comment '员工编号',
name varchar(10) comment '姓名',
sex varchar(2) comment '性别',
mobile int(11) comment '手机号',
deparment varchar(1000) comment '工作单位',
address varchar(4000) comment '常住地址',
duty_time varchar(20) comment '任期',
employee_type varchar(10) comment '员工类型',
order_cnt int default 0 comment '工单数累计'
);

ALTER TABLE employee_info COMMENT '员工信息表';

insert into employee_info values(1  ,'李1'  ,'男',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(2  ,'李2'  ,'男',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(3  ,'李3'  ,'男',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(4  ,'李4'  ,'男',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(5  ,'李5'  ,'男',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(6  ,'李6'  ,'男',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(7  ,'李7'  ,'男',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(8  ,'李8'  ,'男',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(9  ,'李9'  ,'男',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(10 ,'李10' ,'男',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(11 ,'李11' ,'男',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(12 ,'李12' ,'男',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(13 ,'李13' ,'男',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(14 ,'李14' ,'男',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(15 ,'李15' ,'男',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(16 ,'李16' ,'男',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(17 ,'李17' ,'男',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(18 ,'李18' ,'男',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(19 ,'李19' ,'男',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(20 ,'李20' ,'男',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(21 ,'李21' ,'男',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(22 ,'李22' ,'男',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(23 ,'李23' ,'男',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(24 ,'李24' ,'男',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(25 ,'李25' ,'男',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(26 ,'李26' ,'男',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(27 ,'李27' ,'男',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(28 ,'李28' ,'男',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(29 ,'李29' ,'男',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(30 ,'李30' ,'男',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(31 ,'李31' ,'男',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(32 ,'李32' ,'男',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(33 ,'李33' ,'男',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(34 ,'李34' ,'男',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(35 ,'李35' ,'男',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(36 ,'李36' ,'男',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(37 ,'李37' ,'男',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(38 ,'李38' ,'男',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(39 ,'李39' ,'男',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(40 ,'李40' ,'男',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(41 ,'李41' ,'男',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(42 ,'李42' ,'男',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(43 ,'李43' ,'男',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(44 ,'李44' ,'男',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(45 ,'李45' ,'男',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(46 ,'李46' ,'男',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(47 ,'李47' ,'男',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(48 ,'李48' ,'男',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(49 ,'李49' ,'男',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(50 ,'李50' ,'男',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(51 ,'李51' ,'男',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(52 ,'李52' ,'男',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(53 ,'李53' ,'男',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(54 ,'李54' ,'男',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(55 ,'李55' ,'男',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(56 ,'李56' ,'男',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(57 ,'李57' ,'男',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(58 ,'李58' ,'男',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(59 ,'李59' ,'男',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(60 ,'李60' ,'男',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(61 ,'李61' ,'男',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(62 ,'李62' ,'男',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(63 ,'李63' ,'男',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(64 ,'李64' ,'男',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(65 ,'李65' ,'男',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(66 ,'李66' ,'男',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(67 ,'李67' ,'男',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(68 ,'李68' ,'男',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(69 ,'李69' ,'男',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(70 ,'李70' ,'男',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(71 ,'李71' ,'男',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(72 ,'李72' ,'男',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(73 ,'李73' ,'男',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(74 ,'李74' ,'男',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(75 ,'李75' ,'男',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(76 ,'李76' ,'男',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(77 ,'李77' ,'女',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(78 ,'李78' ,'女',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(79 ,'李79' ,'女',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(80 ,'李80' ,'女',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(81 ,'李81' ,'女',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(82 ,'李82' ,'女',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(83 ,'李83' ,'女',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(84 ,'李84' ,'女',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(85 ,'李85' ,'女',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(86 ,'李86' ,'女',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(87 ,'李87' ,'女',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(88 ,'李88' ,'女',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(89 ,'李89' ,'女',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(90 ,'李90' ,'女',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(91 ,'李91' ,'女',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(92 ,'李92' ,'女',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(93 ,'李93' ,'女',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(94 ,'李94' ,'女',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(95 ,'李95' ,'女',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(96 ,'李96' ,'女',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(97 ,'李97' ,'女',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(98 ,'李98' ,'女',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(99 ,'李99' ,'女',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(100,'李100','女',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(101,'李101','女',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(102,'李102','女',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(103,'李103','女',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(104,'李104','女',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(105,'李105','女',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(106,'李106','女',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(107,'李107','女',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(108,'李108','女',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(109,'李109','女',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(110,'李110','女',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(111,'李111','女',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(112,'李112','女',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(113,'李113','女',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(114,'李114','女',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(115,'李115','女',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(116,'李116','女',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(117,'李117','女',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(118,'李118','女',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(119,'李119','女',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(120,'李120','女',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(121,'李121','女',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(122,'李122','女',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(123,'李123','女',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(124,'李124','女',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(125,'李125','女',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(126,'李126','女',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(127,'李127','女',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(128,'李128','女',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(129,'李129','女',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(130,'李130','女',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(131,'李131','女',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(132,'李132','女',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(133,'李133','女',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(134,'李134','女',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(135,'李135','女',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(136,'李136','女',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(137,'李137','女',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(138,'李138','女',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(139,'李139','女',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(140,'李140','女',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(141,'李141','女',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(142,'李142','女',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(143,'李143','女',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(144,'李144','女',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(145,'李145','女',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(146,'李146','女',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'陪审员',0);
insert into employee_info values(147,'李147','女',CONCAT(1881135,FLOOR(RAND()*10),FLOOR(RAND()*10)),null,null,floor(rand()*10),'法官',0);


create table order_info(
id int PRIMARY KEY AUTO_INCREMENT comment '工单流水号',
detail varchar(4000) comment '工单内容',
status varchar(10) comment '工单状态码 -> 关联字典表order_stat',
create_date date comment '工单创建时间',
end_date date comment '工单结束时间',
is_notify varchar(2) comment '是否短信通知,0-否,1-是',
is_urgent varchar(2) comment '是否紧急,0-否,1-是',
operid_1st int comment '1号经办人ID',
operid_2rd int comment '2号经办人ID'
);

ALTER TABLE order_info COMMENT '工单表';

create table order_stat(
id int PRIMARY KEY AUTO_INCREMENT comment '状态码编号',
status varchar(10) comment '工单状态'
);

ALTER TABLE order_stat COMMENT '工单状态字典表';

insert into order_stat values(1,'纠纷');
insert into order_stat values(2,'已完成');
insert into order_stat values(3,'正常,未结束');

commit;
