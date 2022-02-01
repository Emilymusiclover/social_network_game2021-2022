using AppSite.Domain.Shared;
using System.Threading.Tasks;
using System.Collections.Generic;
using System;

namespace AppSite.Domain.Tags
{
    public class TagService
    {
        private readonly IUnitOfWork _unitOfWork;

        private readonly ITagRepository _repo;

        public TagService(IUnitOfWork unitOfWork, ITagRepository repo)
        {
            this._unitOfWork = unitOfWork;
            this._repo = repo;
        }

        public async Task<List<TagDto>> GetAllAsync()
        {
            var list = await this._repo.GetAllAsync();

            List<TagDto> listDto = list.ConvertAll<TagDto>(tag => tag.AsDto());

            return listDto;
        }

        public async Task<TagDto> GetByIdAsync(TagId id)
        {
            var tag = await this._repo.GetByIdAsync(id);

            if (tag == null)
                return null;

            return tag.AsDto();
        }

        public async Task<TagDto> AddAsync(CreateTagDto dto)
        {
            var tag = dto.Convert();

            await this._repo.AddAsync(tag);

            await this._unitOfWork.CommitAsync();

            return tag.AsDto();
        }

        /** public async Task<TagDto> UpdateAsync(TagDto dto)
         {
             var tag = await this._repo.GetByIdAsync(new TagId(dto.Id)); 
 
             if (userProfile == null)
                 return null;   
 
             if(!String.IsNullOrEmpty(dto.ProfileUserName)){
                  userProfile.ChangeProfileUserName(dto.ProfileUserName);
             }
             if(!String.IsNullOrEmpty(dto.UserDescription)){
                  userProfile.ChangeDescription(dto.UserDescription);
             }
 
             if(!String.IsNullOrEmpty(dto.UserPhone)){
                   userProfile.ChangePhoneNumber(dto.UserPhone);
             }
 
             if(!String.IsNullOrEmpty(dto.UserCountry)&&!String.IsNullOrEmpty(dto.UserCountry)){
                 userProfile.ChangeResidency(dto.UserCountry, dto.UserCity);
             }else if(!String.IsNullOrEmpty(dto.UserCountry)){
                 userProfile.ChangeCountry(dto.UserCountry);
             }else if(!String.IsNullOrEmpty(dto.UserCity)){
                 userProfile.ChangeCity(dto.UserCity);
             }
          
            
             
           
           
 
             await this._unitOfWork.CommitAsync();
 
             return userProfile.AsDto();
         }
 
       
 */
    }
}