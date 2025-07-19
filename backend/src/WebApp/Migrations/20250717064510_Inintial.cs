using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class Inintial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "справочник_вагоны",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    nomer = table.Column<int>(type: "integer", nullable: false),
                    way = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    pripiska = table.Column<string>(type: "character varying(1)", maxLength: 1, nullable: true),
                    vladelec = table.Column<int>(type: "integer", nullable: true),
                    koddorogi = table.Column<string>(type: "character varying(10)", maxLength: 10, nullable: true),
                    gruzopodemnost = table.Column<double>(type: "double precision", nullable: true),
                    tara = table.Column<double>(type: "double precision", nullable: true),
                    carzavnom_id = table.Column<string>(type: "character varying(8)", maxLength: 8, nullable: true),
                    carpostr_dt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    carmarka_vl = table.Column<string>(type: "character varying(15)", maxLength: 15, nullable: true),
                    carty_vl = table.Column<string>(type: "character varying(30)", maxLength: 30, nullable: true),
                    cargryz_vl = table.Column<double>(type: "double precision", nullable: true),
                    cartara_vl = table.Column<double>(type: "double precision", nullable: true),
                    carzav_id = table.Column<int>(type: "integer", nullable: true),
                    carosiling_vl = table.Column<int>(type: "integer", nullable: true),
                    carvizdyx_vl = table.Column<string>(type: "character varying(10)", maxLength: 10, nullable: true),
                    cartorm_vl = table.Column<string>(type: "character varying(10)", maxLength: 10, nullable: true),
                    carpoglapar_vl = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: true),
                    carpoglaparadd_vl = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: true),
                    cartele_vl = table.Column<string>(type: "character varying(10)", maxLength: 10, nullable: true),
                    docautor_id = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: true),
                    docdate_dt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    carosi_vl = table.Column<double>(type: "double precision", nullable: true),
                    carkolpat_vl = table.Column<string>(type: "character varying(10)", maxLength: 10, nullable: true),
                    regnom = table.Column<string>(type: "character varying(15)", maxLength: 15, nullable: true),
                    regnom_dt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    regnom_org = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: true),
                    emk_vl = table.Column<double>(type: "double precision", nullable: true),
                    napol_vl = table.Column<decimal>(type: "numeric", nullable: true),
                    caruser_vl = table.Column<int>(type: "integer", nullable: true),
                    caruseraddnor_vl = table.Column<int>(type: "integer", nullable: true),
                    caruserbeg_dt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    carusernot_dt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    create_dt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    create_us = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: true),
                    modified_dt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    modified_us = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: true),
                    cartara_vl_old = table.Column<double>(type: "double precision", nullable: true),
                    ves_vl = table.Column<decimal>(type: "numeric", nullable: true),
                    cartar_vl = table.Column<decimal>(type: "numeric", nullable: true),
                    car_ds = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: true),
                    carinv = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    caruseraddnor_id = table.Column<string>(type: "character varying(10)", maxLength: 10, nullable: true),
                    caruseraddnor_dt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    datappe = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    deystvuet = table.Column<bool>(type: "boolean", nullable: false),
                    tip = table.Column<string>(type: "character varying(6)", maxLength: 6, nullable: true),
                    normaprobega = table.Column<int>(type: "integer", nullable: true),
                    arenda = table.Column<bool>(type: "boolean", nullable: false),
                    суг = table.Column<string>(type: "character varying(3)", maxLength: 3, nullable: true),
                    класс = table.Column<string>(type: "character varying(1)", maxLength: 1, nullable: true),
                    давление = table.Column<double>(type: "double precision", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_справочник_вагоны", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "справочник_видыремонта",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    код = table.Column<int>(type: "integer", nullable: false),
                    видремонта = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    примечание = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_справочник_видыремонта", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "справочник_воздухораспределители",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    код = table.Column<int>(type: "integer", nullable: false),
                    поле1 = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_справочник_воздухораспределители", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "справочник_груз",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    код = table.Column<int>(type: "integer", nullable: false),
                    названиегруза = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    наименование = table.Column<string>(type: "character varying(250)", maxLength: 250, nullable: true),
                    цена = table.Column<double>(type: "double precision", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_справочник_груз", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "справочник_детали",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    коддетали = table.Column<short>(type: "smallint", nullable: false),
                    наименованиедетали = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    деталь = table.Column<short>(type: "smallint", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_справочник_детали", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "справочник_договоры",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    nomer = table.Column<int>(type: "integer", nullable: false),
                    dogovor = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: true),
                    klient = table.Column<string>(type: "character varying(250)", maxLength: 250, nullable: true),
                    valutadogovora = table.Column<string>(name: "valuta dogovora", type: "character varying(3)", maxLength: 3, nullable: true),
                    factoborot = table.Column<short>(type: "smallint", nullable: true),
                    straf = table.Column<int>(type: "integer", nullable: true),
                    tipstraf = table.Column<string>(type: "character varying(4)", maxLength: 4, nullable: true),
                    oborotsutki = table.Column<short>(type: "smallint", nullable: true),
                    deystvuet = table.Column<bool>(type: "boolean", nullable: false),
                    poputnoe = table.Column<short>(type: "smallint", nullable: true),
                    arenda = table.Column<short>(type: "smallint", nullable: true),
                    valutast = table.Column<string>(type: "character varying(3)", maxLength: 3, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_справочник_договоры", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "справочник_договоры_газ",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    nomer = table.Column<int>(type: "integer", nullable: false),
                    dogovor = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: true),
                    klient = table.Column<string>(type: "character varying(250)", maxLength: 250, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_справочник_договоры_газ", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "справочник_клеймо",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    тип = table.Column<string>(type: "character varying(4)", maxLength: 4, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_справочник_клеймо", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "справочник_клиенты",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    nomer = table.Column<int>(type: "integer", nullable: false),
                    klient = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: true),
                    unp = table.Column<string>(type: "character varying(15)", maxLength: 15, nullable: true),
                    adres = table.Column<string>(type: "character varying(250)", maxLength: 250, nullable: true),
                    krklient = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    remont = table.Column<string>(type: "character varying(1)", maxLength: 1, nullable: true),
                    kod = table.Column<string>(type: "character varying(10)", maxLength: 10, nullable: true),
                    коддепоизтхт = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_справочник_клиенты", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "справочник_модельвц",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    код = table.Column<int>(type: "integer", nullable: false),
                    поле1 = table.Column<string>(type: "character varying(75)", maxLength: 75, nullable: true),
                    поле2 = table.Column<double>(type: "double precision", nullable: true),
                    поле3 = table.Column<double>(type: "double precision", nullable: true),
                    поле4 = table.Column<int>(type: "integer", nullable: true),
                    поле5 = table.Column<double>(type: "double precision", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_справочник_модельвц", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "справочник_неисправности",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    код = table.Column<int>(type: "integer", nullable: false),
                    коднеисправности = table.Column<string>(name: "код неисправности", type: "character varying(50)", maxLength: 50, nullable: true),
                    примечание = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_справочник_неисправности", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "справочник_поглащаппарат",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    код = table.Column<int>(type: "integer", nullable: false),
                    поле1 = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_справочник_поглащаппарат", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "справочник_поглащаппарат_учет",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    код = table.Column<int>(type: "integer", nullable: false),
                    заводномер = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    тип = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    год = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    списан = table.Column<bool>(type: "boolean", nullable: false),
                    вагон = table.Column<string>(type: "character varying(8)", maxLength: 8, nullable: true),
                    датаустановки = table.Column<DateTime>(name: "дата установки", type: "timestamp with time zone", nullable: true),
                    хранение = table.Column<int>(type: "integer", nullable: true),
                    выкачен = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_справочник_поглащаппарат_учет", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "справочник_поглащаппарат1",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    код = table.Column<int>(type: "integer", nullable: false),
                    поле1 = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_справочник_поглащаппарат1", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "справочник_работники",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    nomer = table.Column<int>(type: "integer", nullable: false),
                    rabotnik = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: true),
                    dolznost = table.Column<string>(type: "character varying(30)", maxLength: 30, nullable: true),
                    стном = table.Column<string>(type: "character varying(3)", maxLength: 3, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_справочник_работники", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "справочник_станции",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    кодстанции = table.Column<string>(type: "character varying(6)", maxLength: 6, nullable: false),
                    названиестанции = table.Column<string>(type: "character varying(30)", maxLength: 30, nullable: true),
                    остатоквпутим = table.Column<string>(type: "character varying(3)", maxLength: 3, nullable: true),
                    остатоквпутин = table.Column<string>(type: "character varying(3)", maxLength: 3, nullable: true),
                    остатоквпутир = table.Column<string>(type: "character varying(3)", maxLength: 3, nullable: true),
                    остатоквпутив = table.Column<string>(type: "character varying(3)", maxLength: 3, nullable: true),
                    дорога = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    полноенаименование = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    дороганаименование = table.Column<string>(name: "дорога наименование", type: "character varying(50)", maxLength: 50, nullable: true),
                    странадорогикод = table.Column<string>(name: "страна дороги код", type: "character varying(6)", maxLength: 6, nullable: true),
                    странадороги = table.Column<string>(name: "страна дороги", type: "character varying(20)", maxLength: 20, nullable: true),
                    действует = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_справочник_станции", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "справочник_стоимость",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    nomer = table.Column<int>(type: "integer", nullable: false),
                    сутки = table.Column<short>(type: "smallint", nullable: true),
                    отпускнаяцена = table.Column<double>(type: "double precision", nullable: true),
                    отпускнаяценаевро = table.Column<double>(type: "double precision", nullable: true),
                    единицаизмерения = table.Column<string>(type: "character varying(2)", maxLength: 2, nullable: true),
                    отпускнаяценаевро2 = table.Column<double>(type: "double precision", nullable: true),
                    отпускнаяценаевро3 = table.Column<double>(type: "double precision", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_справочник_стоимость", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "справочник_стоимостьевро",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    nomer = table.Column<int>(type: "integer", nullable: false),
                    сутки = table.Column<short>(type: "smallint", nullable: true),
                    отпускнаяцена = table.Column<double>(type: "double precision", nullable: true),
                    единицаизмерения = table.Column<string>(type: "character varying(2)", maxLength: 2, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_справочник_стоимостьевро", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "справочник_страны",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    кодстанции = table.Column<int>(type: "integer", nullable: false),
                    названиестраны = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_справочник_страны", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "справочник_типвц",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    код = table.Column<int>(type: "integer", nullable: false),
                    тип = table.Column<string>(type: "character varying(4)", maxLength: 4, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_справочник_типвц", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "справочник_тормоз",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    код = table.Column<int>(type: "integer", nullable: false),
                    поле1 = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: true),
                    описание = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_справочник_тормоз", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "спрдепо",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    кодпредприятия = table.Column<double>(type: "double precision", nullable: false),
                    наименование = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: true),
                    сокр = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_спрдепо", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "спрдороги",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    коддороги = table.Column<double>(type: "double precision", nullable: false),
                    наименование = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: true),
                    сокр = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_спрдороги", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "спрмодернизация",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    кодмодернизации = table.Column<short>(type: "smallint", nullable: false),
                    наименование = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_спрмодернизация", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "спрпричины",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    код = table.Column<int>(type: "integer", nullable: false),
                    причина = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_спрпричины", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "спрремонты",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    кодремонта = table.Column<short>(type: "smallint", nullable: false),
                    сокр = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: true),
                    наименование = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_спрремонты", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "спрстанции",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    кодстанции = table.Column<int>(type: "integer", nullable: false),
                    наименование = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: true),
                    кодадминистрации = table.Column<short>(type: "smallint", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_спрстанции", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PermissionEntity",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PermissionEntity", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Roles",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Roles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    PasswordHash = table.Column<string>(type: "text", nullable: false),
                    Email = table.Column<string>(type: "text", nullable: false),
                    FirstName = table.Column<string>(type: "text", nullable: false),
                    LastName = table.Column<string>(type: "text", nullable: false),
                    Patronymic = table.Column<string>(type: "text", nullable: false),
                    PhoneNumber = table.Column<string>(type: "text", nullable: false),
                    RefreshToken = table.Column<string>(type: "text", nullable: true),
                    RefreshTokenExpiry = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "спрнеисправности",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    коднеисправности = table.Column<int>(type: "integer", nullable: false),
                    наименование = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: true),
                    сокрнеисправность = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: true),
                    причина = table.Column<Guid>(type: "uuid", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_спрнеисправности", x => x.Id);
                    table.ForeignKey(
                        name: "FK_спрнеисправности_спрпричины_причина",
                        column: x => x.причина,
                        principalTable: "спрпричины",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "RolePermissions",
                columns: table => new
                {
                    RoleId = table.Column<int>(type: "integer", nullable: false),
                    PermissionId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RolePermissions", x => new { x.RoleId, x.PermissionId });
                    table.ForeignKey(
                        name: "FK_RolePermissions_PermissionEntity_PermissionId",
                        column: x => x.PermissionId,
                        principalTable: "PermissionEntity",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RolePermissions_Roles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "Roles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserRoleEntity",
                columns: table => new
                {
                    UserId = table.Column<Guid>(type: "uuid", nullable: false),
                    RoleId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserRoleEntity", x => new { x.UserId, x.RoleId });
                    table.ForeignKey(
                        name: "FK_UserRoleEntity_Roles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "Roles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserRoleEntity_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "PermissionEntity",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1, "Read" },
                    { 2, "Create" },
                    { 3, "Update" },
                    { 4, "Delete" }
                });

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1, "Admin" },
                    { 2, "User" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_спрнеисправности_причина",
                table: "спрнеисправности",
                column: "причина");

            migrationBuilder.CreateIndex(
                name: "IX_RolePermissions_PermissionId",
                table: "RolePermissions",
                column: "PermissionId");

            migrationBuilder.CreateIndex(
                name: "IX_UserRoleEntity_RoleId",
                table: "UserRoleEntity",
                column: "RoleId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "справочник_вагоны");

            migrationBuilder.DropTable(
                name: "справочник_видыремонта");

            migrationBuilder.DropTable(
                name: "справочник_воздухораспределители");

            migrationBuilder.DropTable(
                name: "справочник_груз");

            migrationBuilder.DropTable(
                name: "справочник_детали");

            migrationBuilder.DropTable(
                name: "справочник_договоры");

            migrationBuilder.DropTable(
                name: "справочник_договоры_газ");

            migrationBuilder.DropTable(
                name: "справочник_клеймо");

            migrationBuilder.DropTable(
                name: "справочник_клиенты");

            migrationBuilder.DropTable(
                name: "справочник_модельвц");

            migrationBuilder.DropTable(
                name: "справочник_неисправности");

            migrationBuilder.DropTable(
                name: "справочник_поглащаппарат");

            migrationBuilder.DropTable(
                name: "справочник_поглащаппарат_учет");

            migrationBuilder.DropTable(
                name: "справочник_поглащаппарат1");

            migrationBuilder.DropTable(
                name: "справочник_работники");

            migrationBuilder.DropTable(
                name: "справочник_станции");

            migrationBuilder.DropTable(
                name: "справочник_стоимость");

            migrationBuilder.DropTable(
                name: "справочник_стоимостьевро");

            migrationBuilder.DropTable(
                name: "справочник_страны");

            migrationBuilder.DropTable(
                name: "справочник_типвц");

            migrationBuilder.DropTable(
                name: "справочник_тормоз");

            migrationBuilder.DropTable(
                name: "спрдепо");

            migrationBuilder.DropTable(
                name: "спрдороги");

            migrationBuilder.DropTable(
                name: "спрмодернизация");

            migrationBuilder.DropTable(
                name: "спрнеисправности");

            migrationBuilder.DropTable(
                name: "спрремонты");

            migrationBuilder.DropTable(
                name: "спрстанции");

            migrationBuilder.DropTable(
                name: "RolePermissions");

            migrationBuilder.DropTable(
                name: "UserRoleEntity");

            migrationBuilder.DropTable(
                name: "спрпричины");

            migrationBuilder.DropTable(
                name: "PermissionEntity");

            migrationBuilder.DropTable(
                name: "Roles");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
