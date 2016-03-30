namespace Golf_Website.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class newTees : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.TeeTimes", "AHandicap", c => c.Int(nullable: false));
            AddColumn("dbo.TeeTimes", "APic", c => c.String());
            AddColumn("dbo.TeeTimes", "BHandicap", c => c.Int(nullable: false));
            AddColumn("dbo.TeeTimes", "BPic", c => c.String());
            AddColumn("dbo.TeeTimes", "CHandicap", c => c.Int(nullable: false));
            AddColumn("dbo.TeeTimes", "CPic", c => c.String());
            AddColumn("dbo.TeeTimes", "DHandicap", c => c.Int(nullable: false));
            AddColumn("dbo.TeeTimes", "DPic", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.TeeTimes", "DPic");
            DropColumn("dbo.TeeTimes", "DHandicap");
            DropColumn("dbo.TeeTimes", "CPic");
            DropColumn("dbo.TeeTimes", "CHandicap");
            DropColumn("dbo.TeeTimes", "BPic");
            DropColumn("dbo.TeeTimes", "BHandicap");
            DropColumn("dbo.TeeTimes", "APic");
            DropColumn("dbo.TeeTimes", "AHandicap");
        }
    }
}
