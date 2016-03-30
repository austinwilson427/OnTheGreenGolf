namespace Golf_Website.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class scoreDate : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Scorecards", "ScoreDate", c => c.DateTime(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Scorecards", "ScoreDate");
        }
    }
}
