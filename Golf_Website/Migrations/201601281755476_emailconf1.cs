namespace Golf_Website.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class emailconf1 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.CartItems", "isSubmitted", c => c.Boolean(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.CartItems", "isSubmitted");
        }
    }
}
