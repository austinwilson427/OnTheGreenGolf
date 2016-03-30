namespace Golf_Website.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class score1 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Scorecards", "MyFront", c => c.Int(nullable: false));
            AddColumn("dbo.Scorecards", "MyBack", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Scorecards", "MyBack");
            DropColumn("dbo.Scorecards", "MyFront");
        }
    }
}
