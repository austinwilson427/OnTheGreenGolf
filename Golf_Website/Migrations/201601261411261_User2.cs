namespace Golf_Website.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class User2 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.AspNetUsers", "City", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.AspNetUsers", "City");
        }
    }
}
