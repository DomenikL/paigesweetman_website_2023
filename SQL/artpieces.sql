create table artpieces (
	id int auto_increment, 
    description varchar(200) not null,
    filename varchar(200) not null,
    primary key (id)
);

INSERT INTO `artpieces` (`description`, `filename`) VALUES ('Fisherman''s Dagger 1', 'piece1.png');
INSERT INTO `artpieces` (`description`, `filename`) VALUES ('Fisherman''s Dagger 2', 'piece2.png');
INSERT INTO `artpieces` (`description`, `filename`) VALUES ('Fisherman''s Dagger 3', 'piece3.png');
INSERT INTO `artpieces` (`description`, `filename`) VALUES ('Fisherman''s Dagger 4', 'piece4.png');
INSERT INTO `artpieces` (`description`, `filename`) VALUES ('Fisherman''s Dagger 5', 'piece5.png');
INSERT INTO `artpieces` (`description`, `filename`) VALUES ('Fisherman''s Dagger 6', 'piece6.png');
INSERT INTO `artpieces` (`description`, `filename`) VALUES ('Fumeigator Concept', 'piece7.png');
INSERT INTO `artpieces` (`description`, `filename`) VALUES ('Vax''s Scythe Concept', 'piece8.png');

