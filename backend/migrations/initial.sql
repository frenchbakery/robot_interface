drop table if exists battery;

create table battery (
	id integer primary key,
	name text not null
);

create table battery_log (
	id integer primary key not null,
	battery_id integer not null,
	charge_state double null,
	time_stamp timestamp not null default CURRENT_TIMESTAMP,
	foreign key (battery_id) references battery(id)
);