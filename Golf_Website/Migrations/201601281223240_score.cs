namespace Golf_Website.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class score : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Scorecards", "Front", c => c.Int(nullable: false));
            AddColumn("dbo.Scorecards", "Back", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Scorecards", "Back");
            DropColumn("dbo.Scorecards", "Front");
        }
    }
}
