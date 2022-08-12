using Microsoft.EntityFrameworkCore.Migrations;

namespace CarDealer.Migrations
{
    public partial class init5 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CarModelId",
                table: "Features",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Features_CarModelId",
                table: "Features",
                column: "CarModelId");

            migrationBuilder.AddForeignKey(
                name: "FK_Features_CarModels_CarModelId",
                table: "Features",
                column: "CarModelId",
                principalTable: "CarModels",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Features_CarModels_CarModelId",
                table: "Features");

            migrationBuilder.DropIndex(
                name: "IX_Features_CarModelId",
                table: "Features");

            migrationBuilder.DropColumn(
                name: "CarModelId",
                table: "Features");
        }
    }
}
