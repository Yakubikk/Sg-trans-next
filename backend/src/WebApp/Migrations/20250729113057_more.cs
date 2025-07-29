using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class more : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // migrationBuilder.DropIndex(
            //     name: "IX_Vessels_RailwayCisternId",
            //     table: "Vessels");
            //
            // migrationBuilder.RenameColumn(
            //     name: "RepairTypeId",
            //     table: "RepairTypes",
            //     newName: "Id");
            //
            // migrationBuilder.AddColumn<string>(
            //     name: "Type",
            //     table: "WagonTypes",
            //     type: "text",
            //     nullable: false,
            //     defaultValue: "0");
            //
            // migrationBuilder.AlterColumn<string>(
            //     name: "Description",
            //     table: "RepairTypes",
            //     type: "text",
            //     nullable: false,
            //     defaultValue: "",
            //     oldClrType: typeof(string),
            //     oldType: "text",
            //     oldNullable: true);
            //
            // migrationBuilder.AlterColumn<string>(
            //     name: "Notes",
            //     table: "RailwayCisterns",
            //     type: "text",
            //     nullable: false,
            //     defaultValue: "",
            //     oldClrType: typeof(string),
            //     oldType: "text",
            //     oldNullable: true);
            //
            // migrationBuilder.AddColumn<Guid>(
            //     name: "AffiliationId",
            //     table: "RailwayCisterns",
            //     type: "uuid",
            //     nullable: false,
            //     defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));
            //
            // migrationBuilder.AddColumn<int>(
            //     name: "DangerClass",
            //     table: "RailwayCisterns",
            //     type: "integer",
            //     nullable: false,
            //     defaultValue: 0);
            //
            // migrationBuilder.AddColumn<Guid>(
            //     name: "Ownerid",
            //     table: "RailwayCisterns",
            //     type: "uuid",
            //     nullable: true);
            //
            // migrationBuilder.AddColumn<DateOnly>(
            //     name: "PeriodDepotRepair",
            //     table: "RailwayCisterns",
            //     type: "date",
            //     nullable: true);
            //
            // migrationBuilder.AddColumn<DateOnly>(
            //     name: "PeriodIntermediateTest",
            //     table: "RailwayCisterns",
            //     type: "date",
            //     nullable: true);
            //
            // migrationBuilder.AddColumn<DateOnly>(
            //     name: "PeriodMajorRepair",
            //     table: "RailwayCisterns",
            //     type: "date",
            //     nullable: true);
            //
            // migrationBuilder.AddColumn<DateOnly>(
            //     name: "PeriodPeriodicTest",
            //     table: "RailwayCisterns",
            //     type: "date",
            //     nullable: true);
            //
            // migrationBuilder.AddColumn<decimal>(
            //     name: "Pressure",
            //     table: "RailwayCisterns",
            //     type: "numeric",
            //     nullable: false,
            //     defaultValue: 0m);
            //
            // migrationBuilder.AddColumn<string>(
            //     name: "Pripiska",
            //     table: "RailwayCisterns",
            //     type: "text",
            //     nullable: false,
            //     defaultValue: "");
            //
            // migrationBuilder.AddColumn<DateOnly>(
            //     name: "ReRegistrationDate",
            //     table: "RailwayCisterns",
            //     type: "date",
            //     nullable: true);
            //
            // migrationBuilder.AddColumn<string>(
            //     name: "Rent",
            //     table: "RailwayCisterns",
            //     type: "text",
            //     nullable: false,
            //     defaultValue: "");
            //
            // migrationBuilder.AddColumn<int>(
            //     name: "ServiceLifeYears",
            //     table: "RailwayCisterns",
            //     type: "integer",
            //     nullable: false,
            //     defaultValue: 40);
            //
            // migrationBuilder.AddColumn<string>(
            //     name: "Substance",
            //     table: "RailwayCisterns",
            //     type: "text",
            //     nullable: false,
            //     defaultValue: "СУГ");
            //
            // migrationBuilder.AddColumn<string>(
            //     name: "TechСonditions",
            //     table: "RailwayCisterns",
            //     type: "text",
            //     nullable: false,
            //     defaultValue: "");
            //
            // migrationBuilder.AddColumn<decimal>(
            //     name: "TestPressure",
            //     table: "RailwayCisterns",
            //     type: "numeric",
            //     nullable: false,
            //     defaultValue: 0m);
            //
            // migrationBuilder.AddColumn<int>(
            //     name: "Code",
            //     table: "Manufacturers",
            //     type: "integer",
            //     nullable: false,
            //     defaultValue: 0);
            //
            // migrationBuilder.AddColumn<string>(
            //     name: "ShortName",
            //     table: "Manufacturers",
            //     type: "text",
            //     nullable: false,
            //     defaultValue: "");
            //
            // migrationBuilder.CreateTable(
            //     name: "Affiliations",
            //     columns: table => new
            //     {
            //         Id = table.Column<Guid>(type: "uuid", nullable: false),
            //         Value = table.Column<string>(type: "text", nullable: false)
            //     },
            //     constraints: table =>
            //     {
            //         table.PrimaryKey("PK_Affiliations", x => x.Id);
            //     });
            //
            // migrationBuilder.CreateTable(
            //     name: "MilageCisterns",
            //     columns: table => new
            //     {
            //         Id = table.Column<Guid>(type: "uuid", nullable: false),
            //         CisternId = table.Column<Guid>(type: "uuid", nullable: false),
            //         Milage = table.Column<int>(type: "integer", nullable: false),
            //         MilageNorm = table.Column<int>(type: "integer", nullable: false),
            //         RepairTypeId = table.Column<Guid>(type: "uuid", nullable: false),
            //         RepairDate = table.Column<DateOnly>(type: "date", nullable: false),
            //         InputModeCode = table.Column<int>(type: "integer", nullable: false),
            //         InputDate = table.Column<DateOnly>(type: "date", nullable: false),
            //         CisternNumber = table.Column<string>(type: "text", nullable: false)
            //     },
            //     constraints: table =>
            //     {
            //         table.PrimaryKey("PK_MilageCisterns", x => x.Id);
            //         table.ForeignKey(
            //             name: "FK_CisternId_RailwayCisterns_id",
            //             column: x => x.CisternId,
            //             principalTable: "RailwayCisterns",
            //             principalColumn: "Id");
            //         table.ForeignKey(
            //             name: "FK_RepairTypeId_RepairTypes_id",
            //             column: x => x.RepairTypeId,
            //             principalTable: "RepairTypes",
            //             principalColumn: "Id");
            //     });
            //
            // migrationBuilder.CreateTable(
            //     name: "Owners",
            //     columns: table => new
            //     {
            //         Id = table.Column<Guid>(type: "uuid", nullable: false),
            //         Name = table.Column<string>(type: "text", nullable: false),
            //         UNP = table.Column<string>(type: "text", nullable: false),
            //         CreatedAt = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: true),
            //         UpdatedAt = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: true),
            //         CreatorId = table.Column<string>(type: "text", nullable: false),
            //         ShortName = table.Column<string>(type: "text", nullable: false),
            //         Address = table.Column<string>(type: "text", nullable: false),
            //         TreatRepairs = table.Column<bool>(type: "boolean", nullable: false)
            //     },
            //     constraints: table =>
            //     {
            //         table.PrimaryKey("PK_Owners", x => x.Id);
            //     });
            //
            // migrationBuilder.CreateIndex(
            //     name: "IX_Vessels_RailwayCisternId",
            //     table: "Vessels",
            //     column: "RailwayCisternId");
            //
            // migrationBuilder.CreateIndex(
            //     name: "IX_RailwayCisterns_AffiliationId",
            //     table: "RailwayCisterns",
            //     column: "AffiliationId");
            //
            // migrationBuilder.CreateIndex(
            //     name: "IX_RailwayCisterns_Ownerid",
            //     table: "RailwayCisterns",
            //     column: "Ownerid");
            //
            // migrationBuilder.CreateIndex(
            //     name: "IX_MilageCisterns_CisternId",
            //     table: "MilageCisterns",
            //     column: "CisternId");
            //
            // migrationBuilder.CreateIndex(
            //     name: "IX_MilageCisterns_RepairTypeId",
            //     table: "MilageCisterns",
            //     column: "RepairTypeId");
            //
            // migrationBuilder.AddForeignKey(
            //     name: "FK_RailwayCisterns_Affiliations_AffiliationId",
            //     table: "RailwayCisterns",
            //     column: "AffiliationId",
            //     principalTable: "Affiliations",
            //     principalColumn: "Id");
            //
            // migrationBuilder.AddForeignKey(
            //     name: "FK_RailwayCisterns_Owners_Ownerid",
            //     table: "RailwayCisterns",
            //     column: "Ownerid",
            //     principalTable: "Owners",
            //     principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RailwayCisterns_Affiliations_AffiliationId",
                table: "RailwayCisterns");

            migrationBuilder.DropForeignKey(
                name: "FK_RailwayCisterns_Owners_Ownerid",
                table: "RailwayCisterns");

            migrationBuilder.DropTable(
                name: "Affiliations");

            migrationBuilder.DropTable(
                name: "MilageCisterns");

            migrationBuilder.DropTable(
                name: "Owners");

            migrationBuilder.DropIndex(
                name: "IX_Vessels_RailwayCisternId",
                table: "Vessels");

            migrationBuilder.DropIndex(
                name: "IX_RailwayCisterns_AffiliationId",
                table: "RailwayCisterns");

            migrationBuilder.DropIndex(
                name: "IX_RailwayCisterns_Ownerid",
                table: "RailwayCisterns");

            migrationBuilder.DropColumn(
                name: "Type",
                table: "WagonTypes");

            migrationBuilder.DropColumn(
                name: "AffiliationId",
                table: "RailwayCisterns");

            migrationBuilder.DropColumn(
                name: "DangerClass",
                table: "RailwayCisterns");

            migrationBuilder.DropColumn(
                name: "Ownerid",
                table: "RailwayCisterns");

            migrationBuilder.DropColumn(
                name: "PeriodDepotRepair",
                table: "RailwayCisterns");

            migrationBuilder.DropColumn(
                name: "PeriodIntermediateTest",
                table: "RailwayCisterns");

            migrationBuilder.DropColumn(
                name: "PeriodMajorRepair",
                table: "RailwayCisterns");

            migrationBuilder.DropColumn(
                name: "PeriodPeriodicTest",
                table: "RailwayCisterns");

            migrationBuilder.DropColumn(
                name: "Pressure",
                table: "RailwayCisterns");

            migrationBuilder.DropColumn(
                name: "Pripiska",
                table: "RailwayCisterns");

            migrationBuilder.DropColumn(
                name: "ReRegistrationDate",
                table: "RailwayCisterns");

            migrationBuilder.DropColumn(
                name: "Rent",
                table: "RailwayCisterns");

            migrationBuilder.DropColumn(
                name: "ServiceLifeYears",
                table: "RailwayCisterns");

            migrationBuilder.DropColumn(
                name: "Substance",
                table: "RailwayCisterns");

            migrationBuilder.DropColumn(
                name: "TechСonditions",
                table: "RailwayCisterns");

            migrationBuilder.DropColumn(
                name: "TestPressure",
                table: "RailwayCisterns");

            migrationBuilder.DropColumn(
                name: "Code",
                table: "Manufacturers");

            migrationBuilder.DropColumn(
                name: "ShortName",
                table: "Manufacturers");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "RepairTypes",
                newName: "RepairTypeId");

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "RepairTypes",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<string>(
                name: "Notes",
                table: "RailwayCisterns",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.CreateIndex(
                name: "IX_Vessels_RailwayCisternId",
                table: "Vessels",
                column: "RailwayCisternId",
                unique: true);
        }
    }
}
