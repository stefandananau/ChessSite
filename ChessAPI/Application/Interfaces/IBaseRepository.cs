using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface IBaseRepository<T> where T : BaseEntity
    {
        public T GetById(int? id);
        public void Insert(T entity);
        public void Update(T entity);
        public void Remove(T entity);
        public List<T> GetAll();
        public bool Any(Func<T, bool> expression);
        public IQueryable<T> GetRecords();
        public void SaveChanges();
    }
}
