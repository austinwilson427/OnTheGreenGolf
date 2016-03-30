namespace Golf_Website.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class scoreDate1 : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Scorecards", "MyDifficulty", c => c.String());
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Scorecards", "MyDifficulty", c => c.Int(nullable: false));
        }
    }
}
