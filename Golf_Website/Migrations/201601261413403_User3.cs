namespace Golf_Website.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class User3 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.AspNetUsers", "State", c => c.String());
            AddColumn("dbo.AspNetUsers", "Zip", c => c.Int(nullable: false));
            AddColumn("dbo.AspNetUsers", "Sex", c => c.String());
            AddColumn("dbo.AspNetUsers", "Birthday", c => c.DateTime(nullable: false));
            AddColumn("dbo.AspNetUsers", "HomeCourse", c => c.String());
            AddColumn("dbo.AspNetUsers", "Handicap", c => c.Int(nullable: false));
            AddColumn("dbo.AspNetUsers", "DrivingDistance", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.AspNetUsers", "DrivingDistance");
            DropColumn("dbo.AspNetUsers", "Handicap");
            DropColumn("dbo.AspNetUsers", "HomeCourse");
            DropColumn("dbo.AspNetUsers", "Birthday");
            DropColumn("dbo.AspNetUsers", "Sex");
            DropColumn("dbo.AspNetUsers", "Zip");
            DropColumn("dbo.AspNetUsers", "State");
        }
    }
}
