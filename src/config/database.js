module.exports = {
  /* The dialect of the database, in this case, PostgreSQL. */
  dialect: 'postgres',

  /* The host of the database server. */
  host: 'localhost',

  /* The username to use when connecting to the database. */
  username: 'postgres',

  /* The password to use when connecting to the database. */
  password: 'postgres',

  /* The name of the database to connect to. */
  database: 'ieq',

  /* The port number to use when connecting to the database. */
  port: 5432,

  /* A set of options to customize the behavior of Sequelize. */
  define: {
    /* Automatically add timestamps (createdAt, updatedAt) to models. */
    timestamps: true,

    /* Use underscored names for attributes (e.g. createdAt instead of CreatedAt). */
    underscored: true,

    /* Use underscored names for all attributes, including associations. */
    underscoredAll: true,
  },
}
