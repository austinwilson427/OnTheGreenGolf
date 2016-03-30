namespace Golf_Website.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class handicapAdj : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Scorecards", "HandicapAdj", c => c.Double(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Scorecards", "HandicapAdj");
        }
    }
}
