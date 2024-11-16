using Application.Interfaces;
using Domain.Entities;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class BaseRepository<T> : IBaseRepository<T> where T : BaseEntity
    {
        protected readonly ChessDataContext _dataContext;
        private readonly DbSet<T> _dbSet;

        public BaseRepository(ChessDataContext dataContext)
        {
            _dataContext = dataContext;
            _dbSet = _dataContext.Set<T>();
        }

        public T GetById(int? id)
        {
            if (id == null) throw new ArgumentNullException();
            return _dbSet.FirstOrDefault(entity => entity.Id == id);
        }

        public void Insert(T entity)
        {
            _dbSet.Add(entity);
        }

        public void Update(T entity)
        {
            _dbSet.Update(entity);
        }
        public void Remove(T entity)
        {
            _dbSet.Remove(entity);
        }

        public List<T> GetAll()
        {
            return GetRecords().ToList();
        }

        public bool Any(Func<T, bool> expression)
        {
            return GetRecords().Any(expression);
        }

        public IQueryable<T> GetRecords()
        {
            return _dbSet.AsQueryable<T>();
        }

        public void SaveChanges()
        {
            try
            {
                _dataContext.SaveChanges();
            }
            catch (Exception exception)
            {
                var errorMessage = "Error when saving to the database: "
                    + $"{exception.Message}\n\n"
                    + $"{exception.InnerException}\n\n"
                    + $"{exception.StackTrace}\n\n";

                Console.WriteLine(errorMessage);
            }
        }
    }
}
