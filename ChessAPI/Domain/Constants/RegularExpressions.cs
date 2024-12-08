namespace Domain.Constants
{
    public class RegularExpressions
    {
        public const string EMAIL_REGEX = "^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$";
        public const string PASSWORD_REGEX = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,20}$";
        public const string USERNAME_REGEX = "^[a-zA-Z0-9]{3,20}$";
    }
}
