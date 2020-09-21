import React from 'react';
import ContentRightComponent from './ContentRightComponent';
import CommentPomponent from '../CommentComponent';
import AnswerComponent from '../AnswerComponent';

class ContentComponent extends React.Component {

    render() {
        return (
            <div style={{ display: 'flex' }}>
                <div>


                    <div style={{ width: '700px' }}>
                        Is there something special to the @Deprecated annotation that I cannot reproduce?

                        I need to create an annotation similar to @Deprecated to produce warnings in Eclipse and also at build time. When I mark a method as @Deprecated I get nice warnings. For example, if I have an old method (that I may still keep for compatibility reasons):

                        @Deprecated
                        public List getClientAccounts(final int clientId)
                        // Implement search...

                        Then, if I try to use it in Eclipse I can see it strikethrough, and a yellow icon in the left bar:

                        enter image description here

                        Also when building I can see the:

                        [WARNING] app1/src/test/java/com/app1/MyApp.java: app1/src/test/java/com/app1/MyApp.java uses or overrides a deprecated API.

                        Now, depending on external factors I cannot control (e.g. absence of database indexes) some methods are not optimal, and I would like to clearly mark them as such... with my brand new @NonOptimal annotation. I need to add visibility to the problem. So far I have:

                        @Retention(RUNTIME)
                        @Target(METHOD)
                        // What else here?
                        public @interface NonOptimal

                        How can I create this annotation?
                 </div>
                    <div style={{ marginTop: '20px' }}>
                        {/* 标签 */}
                java annotation compatibility
                 </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>share      follow</div>
                        <div style={{ backgroundColor: '#E1ECF4' ,padding:'10px'}}>
                            <div>asked Aug 19 at 15:07</div>
                            <div style={{ display: 'flex' }}>
                                <a>头像</a>
                                <div>
                                    <a>
                                        The Impaler
                                    </a>
                                    <div>
                                        25.3k66 2323 51
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        {/* 评论区 */}
                        <CommentPomponent />
                    </div>

                    <div>
                        {/* 回答区 */}
                        <AnswerComponent />
                    </div>
                </div>
                <ContentRightComponent />
            </div>

        )
    }
}

export default ContentComponent;