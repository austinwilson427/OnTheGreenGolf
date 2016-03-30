namespace Golf_Website.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class sc1 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Scorecards", "UserName", c => c.String());
            DropColumn("dbo.Scorecards", "UserId");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Scorecards", "UserId", c => c.Int(nullable: false));
            DropColumn("dbo.Scorecards", "UserName");
        }
    }
}
