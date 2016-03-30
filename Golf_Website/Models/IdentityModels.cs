using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using System.Data.Entity;
using System;

namespace Golf_Website.Models
{
    // You can add profile data for the user by adding more properties to your ApplicationUser class, please visit http://go.microsoft.com/fwlink/?LinkID=317594 to learn more.
    public class ApplicationUser : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public int Zip { get; set; }
        public string Sex { get; set; }
        public DateTime Birthday { get; set; }
        public string HomeCourse { get; set; }
        public int Handicap { get; set; }
        public int DrivingDistance { get; set; }
        public string PicUrl { get; set; }
        public int ProfileId { get; set; }

        public async Task<ClaimsIdentity> GenerateUserIdentityAsync(UserManager<ApplicationUser> manager, string authenticationType)
        {
            // Note the authenticationType must match the one defined in CookieAuthenticationOptions.AuthenticationType
            var userIdentity = await manager.CreateIdentityAsync(this, authenticationType);
            // Add custom user claims here
            return userIdentity;
        }
    }

    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public IDbSet<Product> Products { get; set; }
        public IDbSet<Course> Courses { get; set; }
        public IDbSet<TeeTime> TeeTimes { get; set; }
        public IDbSet<Profile> Profiles { get; set; }
        public IDbSet<CartItem> CartItems { get; set; }
        public IDbSet<ItemsInCart> ItemsInCarts { get; set; }
        public IDbSet<Scorecard> Scorecards { get; set; }
        public IDbSet<Friendship> Friendships { get; set; }
        public ApplicationDbContext()
            : base("DefaultConnection", throwIfV1Schema: false)
        {
        }

        public static ApplicationDbContext Create()
        {
            return new ApplicationDbContext();
        }
    }
}