namespace Golf_Website.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class profileId : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.AspNetUsers", "ProfileId", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.AspNetUsers", "ProfileId");
        }
    }
}
