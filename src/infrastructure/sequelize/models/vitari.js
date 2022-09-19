module.exports = function (sequelize, DataTypes) {
  const Vitari = sequelize.define(
    "vitari",
    {
      vitari_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      trader_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "trader",
          key: "trader_id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      },
      artist_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "artist",
          key: "artist_id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      },
      album_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "album",
          key: "album_id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      },
      notes: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      timestamps: true,
      underscored: true,
      tableName: "vitari",
    }
  );

  Vitari.associate = (models) => {
    Vitari.hasOne(models.Album, { as: "Album", foreignKey: "album_id" });
    Vitari.hasOne(models.Artist, { as: "Artist", foreignKey: "artist_id" });
    Vitari.belongsTo(models.Trader, {
      as: "Trader",
      foreignKey: "trader_id",
      targetKey: "trader_id",
    });
  };

  return Vitari;
};
