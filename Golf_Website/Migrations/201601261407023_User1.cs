namespace Golf_Website.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class User1 : DbMigration
    {
        public override void Up()
        {
            DropColumn("dbo.AspNetUsers", "City");
            DropColumn("dbo.AspNetUsers", "State");
            DropColumn("dbo.AspNetUsers", "Zip");
            DropColumn("dbo.AspNetUsers", "Sex");
            DropColumn("dbo.AspNetUsers", "Birthday");
            DropColumn("dbo.AspNetUsers", "HomeCourse");
            DropColumn("dbo.AspNetUsers", "Handicap");
            DropColumn("dbo.AspNetUsers", "DrivingDistance");
        }
        
        public override void Down()
        {
            AddColumn("dbo.AspNetUsers", "DrivingDistance", c => c.Int(nullable: false));
            AddColumn("dbo.AspNetUsers", "Handicap", c => c.Int(nullable: false));
            AddColumn("dbo.AspNetUsers", "HomeCourse", c => c.String());
            AddColumn("dbo.AspNetUsers", "Birthday", c => c.DateTime(nullable: false));
            AddColumn("dbo.AspNetUsers", "Sex", c => c.String());
            AddColumn("dbo.AspNetUsers", "Zip", c => c.Int(nullable: false));
            AddColumn("dbo.AspNetUsers", "State", c => c.String());
            AddColumn("dbo.AspNetUsers", "City", c => c.String());
        }
    }
}
