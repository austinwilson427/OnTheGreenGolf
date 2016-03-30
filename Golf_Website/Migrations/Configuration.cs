namespace Golf_Website.Migrations
{
    using Microsoft.AspNet.Identity;
    using Microsoft.AspNet.Identity.EntityFramework;
    using Models;
    using System;
    using System.Collections.Generic;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;
    using System.Security.Claims;
    internal sealed class Configuration : DbMigrationsConfiguration<Golf_Website.Models.ApplicationDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(Golf_Website.Models.ApplicationDbContext db)
        {
            #region logIn

            this.createUser(db, "austinwilson427", "austin.wilson427@gmail.com", "Austin", "Wilson", "Montgomery", "Texas", 77316, "Male", new DateTime(1987, 4, 27), "Woodforest Golf Club", 18, 285, "Secret123!", "https://cdn.filepicker.io/api/file/tM3SjpuQa3D6vUtodCMw");

            #endregion

            #region friendship




            #endregion
            
            #region itemsInCarts

            var itemsInCarts = new ItemsInCart[]
            {
                new ItemsInCart {UserName="austinwilson427", ItemCount = 0}
            };

            #endregion

            #region cartItems

            var cartItems = new CartItem[]
            {
                new CartItem { ProdId= "1ca1d", ItemName = "Callaway XR Pro", Quantity = 2, Price = 299.99m, OrderDate = new DateTime(2016, 1, 27, 7, 31, 0), UserName = "austinwilson427" }
            };

            #endregion


            #region products
            var products = new Product[]
            {
                new Product {ProdId= "1ca1d", Category= "Drivers", FileName= "/Images/Golf_Clubs/Drivers/Callaway/XR_Pro_Driver.jpg", Make= "Callaway", Type= "Drivers", ShortDesc= "Callaway XR Pro", Price = 299.99m, Rating = 3.8 }
            };
            #endregion

            #region courses
            DateTime woodforestStartTime = new DateTime(2016, 1, 29, 7, 0, 0);
            var woodforestTeeTimes = generatingTeeTimeDataBase(woodforestStartTime, 15, 7, 0, 17, 30);

            DateTime carltonWoodsStartTime = new DateTime(2016, 1, 29, 7, 0, 0);
            var carltonWoodsTeeTimes = generatingTeeTimeDataBase(carltonWoodsStartTime, 15, 7, 0, 17, 30);

            DateTime windRoseStartTime = new DateTime(2016, 1, 29, 7, 0, 0);
            var windRoseTeeTimes = generatingTeeTimeDataBase(windRoseStartTime, 15, 7, 0, 17, 30);

            var courses = new Course[]
            {
                new Course
                {
                    CourseName= "Woodforest Golf Club",
                    City = "Montgomery",
                    State = "Texas",
                    Rating = 4.2,
                    ChampPar = 72,
                    ChampRating = 72.1,
                    ChampSlope = 129,
                    ChampYardage = 6834,
                    TournPar = 72,
                    TournRating = 68.7,
                    TournSlope = 118,
                    TournYardage = 6526,
                    MembPar = 72,
                    MembRating = 67.7,
                    MembSlope = 114,
                    MembYardage = 6197,
                    LadyPar = 72,
                    LadyRating = 68.2,
                    LadySlope = 116,
                    LadyYardage = 5293,
                    TeeTimes = woodforestTeeTimes
                },
                new Course
                {
                    CourseName = "Windrose Golf Club",
                    City = "Spring",
                    State = "Texas",
                    Rating = 2.9,
                    ChampPar = 72,
                    ChampRating = 73.0,
                    ChampSlope = 128,
                    ChampYardage = 7203,
                    TournPar = 72,
                    TournRating = 70.1,
                    TournSlope = 122,
                    TournYardage = 6910,
                    MembPar = 72,
                    MembRating = 66.2,
                    MembSlope = 112,
                    MembYardage = 6781,
                    LadyPar = 72,
                    LadyRating = 67.9,
                    LadySlope = 114,
                    LadyYardage = 5929,
                    TeeTimes = windRoseTeeTimes
                },
                new Course
                {
                    CourseName= "The Club at Carlton Woods",
                    City = "The Woodlands",
                    State = "Texas",
                    Rating = 4.0,
                    ChampPar = 72,
                    ChampRating = 72.7,
                    ChampSlope = 130,
                    ChampYardage = 6959,
                    TournPar = 72,
                    TournRating = 70.8,
                    TournSlope = 128,
                    TournYardage = 6558,
                    MembPar = 72,
                    MembRating = 69.8,
                    MembSlope = 124,
                    MembYardage = 6273,
                    LadyPar = 72,
                    LadyRating = 71.2,
                    LadySlope = 127,
                    LadyYardage = 5496,
                    TeeTimes = carltonWoodsTeeTimes
                }
            };
            #endregion



            db.Products.AddOrUpdate(p => p.ProdId, products);
            db.Courses.AddOrUpdate(c => c.CourseName, courses);
            //db.CartItems.AddOrUpdate(c => new { c.UserName, c.ItemName }, cartItems);
            db.ItemsInCarts.AddOrUpdate(i => i.UserName, itemsInCarts);
        }
        

        public List<TeeTime> generatingTeeTimeDataBase(DateTime firstReservationTime, int teeTimeIncrement, int startHour, int startMin, int endHour, int endMin)
        {
            int numberOfTeeTimes = ((endHour * 60 + endMin) - (startHour * 60 + startMin)) / teeTimeIncrement;
            var teeTimesReturn = new List<TeeTime>();
            for (int i = 0; i <= numberOfTeeTimes; i++)
            {
                var teeTime = new TeeTime
                {
                    ResTime = firstReservationTime,
                    A = null,
                    B = null,
                    C = null,
                    D = null,
                    AHandicap = 9999,
                    APic = null,
                    BHandicap = 9999,
                    BPic = null,
                    CHandicap = 9999,
                    CPic = null,
                    DHandicap = 9999,
                    DPic = null
                };
                teeTimesReturn.Add(teeTime);
                firstReservationTime = firstReservationTime.AddMinutes(teeTimeIncrement);
            }
            return teeTimesReturn;
        }

        public void createUser(ApplicationDbContext context, string userName, string email, string firstName, string lastName, string city, string state, int zip, string sex, DateTime birthday, string homeCourse, int handicap, int drivingDistance, string password, string picUrl )
        {
            var userStore = new UserStore<ApplicationUser>(context);
            var userManager = new ApplicationUserManager(userStore);

            //Create a new user
            var user = userManager.FindByName(userName);
            var profiles = new Profile[]
            {
                new Profile
                {
                    UserName = userName,
                    Email = email,
                    FirstName = firstName,
                    LastName = lastName,
                    City = city,
                    State = state,
                    Zip = zip,
                    Sex = sex,
                    Birthday = birthday,
                    HomeCourse = homeCourse,
                    Handicap = handicap,
                    DrivingDistance = drivingDistance,
                    PicUrl = picUrl
                }
            };

            context.Profiles.AddOrUpdate(p => p.UserName, profiles);

            //If it doesn't find a user, create a new user
            if (user == null)
            {
                user = new ApplicationUser
                {
                    UserName = userName,
                    Email = email,
                    FirstName = firstName,
                    LastName = lastName,
                    City = city,
                    State = state,
                    Zip = zip,
                    Sex = sex,
                    Birthday = birthday,
                    HomeCourse = homeCourse,
                    Handicap = handicap,
                    DrivingDistance = drivingDistance,
                    PicUrl = picUrl
                };

                userManager.Create(user, password);
                userManager.AddClaim(user.Id, new System.Security.Claims.Claim("Admin", "true"));

            }

        }
    }

}
