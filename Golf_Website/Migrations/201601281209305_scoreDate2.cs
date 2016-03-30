namespace Golf_Website.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class scoreDate2 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Scorecards", "TotalPar", c => c.Int(nullable: false));
            AddColumn("dbo.Scorecards", "MyTotal", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Scorecards", "MyTotal");
            DropColumn("dbo.Scorecards", "TotalPar");
        }
    }
}
