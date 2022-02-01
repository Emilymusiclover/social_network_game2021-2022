using AppSite.Domain.Shared;
using System.Threading.Tasks;
using System.Collections.Generic;
using System;

namespace AppSite.Domain.Tags
{
    public class TagCloudService
    {
        private readonly IUnitOfWork _unitOfWork;

        private readonly ITagCloudRepository _repo;

        private readonly ITagRepository _repTag;

        public TagCloudService(IUnitOfWork unitOfWork, ITagCloudRepository repo, ITagRepository repTag)
        {
            this._unitOfWork = unitOfWork;
            this._repo = repo;
            this._repTag = repTag;
        }

        public async Task<List<TagCloudDto>> GetAllAsync()
        {
            var list = await this._repo.GetAllTagCloud();

            List<TagCloudDto> listDto = list.ConvertAll<TagCloudDto>(tag => tag.AsDto());

            return listDto;
        }

        public async Task<TagCloudDto> GetByIdAsync(TagCloudId id)
        {
            var tagCloud = await this._repo.GetTagCloudById(id);

            if (tagCloud == null)
                return null;

            return tagCloud.AsDto();
        }

        public async Task<TagCloudDto> AddAsync(CreateTagCloudDto dto)
        {
            var tagCloud = dto.Convert();

            await this._repo.AddAsync(tagCloud);

            await this._unitOfWork.CommitAsync();

            return tagCloud.AsDto();
        }

        public async Task<TagCloudDto> AddTagsToTagCloud(TagCloudId id, List<String> tags)
        {
            List<Tag> tagsList = new List<Tag>();
            tags.ForEach(tag => tagsList.Add(new Tag(TagName.ValueOf(tag)))
            );
            if (tagsList is null)
            {
                return null;
            }


            await addTags(id, tagsList);


            var tagCloud = await _repo.GetTagCloudById(id);


            return tagCloud.AsDto();
        }


        private async Task addTags(TagCloudId id, List<Tag> tags)
        {
            await _repo.AddTags(id, tags);
            await this._unitOfWork.CommitAsync();
        }


        public async Task<TagCloudDto> updateTagCloud(TagCloudDto dto)
        {
            var tagCloud = await _repo.GetTagCloudById(new TagCloudId(dto.Id));

            if (tagCloud == null)
            {
                return null;
            }

            tagCloud.ChangeTags(dto.Tags.ConvertAll<Tag>(tag => tag.Convert()));

            await this._unitOfWork.CommitAsync();

            return tagCloud.AsDto();
        }
    }
}