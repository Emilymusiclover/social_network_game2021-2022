import UserService from './UserService'
import ConnectionService from './ConnectionService'
import IntroductionRequestService from './IntroductionRequestService';
import ConnectionRequestService from './ConnectionRequestService';
import PostService from './PostService';
import TagService from './TagService';
import FeedService from './FeedService'

const GlobalServices = ({children}) => {
    return (
        <>
            <UserService>
                <ConnectionService>
                    <IntroductionRequestService>
                        <ConnectionRequestService>
                            <PostService>
                                <TagService>
                                    <FeedService>
                                        {children}
                                    </FeedService>

                                </TagService>
                            </PostService>
                        </ConnectionRequestService>
                    </IntroductionRequestService>
                </ConnectionService>
            </UserService>
        </>
    )
}

export default GlobalServices;