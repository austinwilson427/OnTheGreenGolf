namespace Golf_Website.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class WithPic : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.AspNetUsers", "PicUrl", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.AspNetUsers", "PicUrl");
        }
    }
}
