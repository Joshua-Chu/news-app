import { Box, Grid } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { NewsCard } from "../component/NewsCard";
// import { useAuth } from "../store/AuthProvider";

const cardData = {
    id: "6e25ed62-4fba-4df4-bf02-6e183615fcbc",
    title: "React",
    content: `<p>React does not attempt to provide a complete "application library". It is designed specifically for building user interfaces<a href="https://en.wikipedia.org/wiki/React_(JavaScript_library)#cite_note-react-3" rel="noopener noreferrer" target="_blank" style="color: rgb(6, 69, 173);"><sup>[3]</sup></a>&nbsp;and therefore does not include many of the tools some developers might consider necessary to build an application. This allows the choice of whichever libraries the developer prefers to accomplish tasks such as performing network access or local data storage. Common patterns of usage have emerged as the library matures.</p><h3><strong>Unidirectional data flow</strong><strong style="color: rgb(84, 89, 93);">[</strong><a href="https://en.wikipedia.org/w/index.php?title=React_(JavaScript_library)&amp;action=edit&amp;section=14" rel="noopener noreferrer" target="_blank" style="color: rgb(6, 69, 173);"><strong>edit</strong></a><strong style="color: rgb(84, 89, 93);">]</strong></h3><p>To support React's concept of unidirectional data flow (which might be contrasted with&nbsp;<a href="https://en.wikipedia.org/wiki/AngularJS" rel="noopener noreferrer" target="_blank" style="color: rgb(6, 69, 173);">AngularJS</a>'s bidirectional flow), the Flux architecture was developed as an alternative to the popular&nbsp;<a href="https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller" rel="noopener noreferrer" target="_blank" style="color: rgb(6, 69, 173);">model–view–controller</a>&nbsp;architecture. Flux features&nbsp;<em>actions</em>&nbsp;which are sent through a central&nbsp;<em>dispatcher</em>&nbsp;to a&nbsp;<em>store</em>, and changes to the store are propagated back to the view.<a href="https://en.wikipedia.org/wiki/React_(JavaScript_library)#cite_note-flux-23" rel="noopener noreferrer" target="_blank" style="color: rgb(6, 69, 173);"><sup>[23]</sup></a>&nbsp;When used with React, this propagation is accomplished through component properties. Since its conception, Flux has been superseded by libraries such as&nbsp;<a href="https://en.wikipedia.org/wiki/Redux_(JavaScript_library)" rel="noopener noreferrer" target="_blank" style="color: rgb(6, 69, 173);">Redux</a>&nbsp;and MobX.<a href="https://en.wikipedia.org/wiki/React_(JavaScript_library)#cite_note-24" rel="noopener noreferrer" target="_blank" style="color: rgb(6, 69, 173);"><sup>[24]</sup></a></p><p>Flux can be considered a variant of the&nbsp;<a href="https://en.wikipedia.org/wiki/Observer_pattern" rel="noopener noreferrer" target="_blank" style="color: rgb(6, 69, 173);">observer pattern</a>.<a href="https://en.wikipedia.org/wiki/React_(JavaScript_library)#cite_note-25" rel="noopener noreferrer" target="_blank" style="color: rgb(6, 69, 173);"><sup>[25]</sup></a></p><p>A React component under the Flux architecture should not directly modify any props passed to it, but should be passed callback functions that create&nbsp;<em>actions</em>&nbsp;which are sent by the dispatcher to modify the store. The action is an object whose responsibility is to describe what has taken place: for example, an action describing one user "following" another might contain a user id, a target user id, and the type&nbsp;<code style="color: rgb(0, 0, 0); background-color: rgb(248, 249, 250);">USER_FOLLOWED_ANOTHER_USER</code>.<a href="https://en.wikipedia.org/wiki/React_(JavaScript_library)#cite_note-26" rel="noopener noreferrer" target="_blank" style="color: rgb(6, 69, 173);"><sup>[26]</sup></a>&nbsp;The stores, which can be thought of as models, can alter themselves in response to actions received from the dispatcher.</p><p>This pattern is sometimes expressed as "properties flow down, actions flow up". Many implementations of Flux have been created since its inception, perhaps the most well-known being&nbsp;<a href="https://en.wikipedia.org/wiki/Redux_(JavaScript_library)" rel="noopener noreferrer" target="_blank" style="color: rgb(6, 69, 173);">Redux</a>, which features a single store, often called&nbsp;</p>`,
    banner: "https://res.cloudinary.com/dlfecpmkj/image/upload/v1645279013/news-upload/drpmrxq3hywlpyjlti6p.png",
    created_at: "02/19/2022, 09:56:55 PM",
    author: {
        id: "51cd5c4b-51e6-4160-a4aa-ebdcea08c747",
        email: "test@test.com",
        profile_photo:
            "https://res.cloudinary.com/dlfecpmkj/image/upload/v1645279013/news-upload/drpmrxq3hywlpyjlti6p.png",
    },
};

const Home = () => {
    // const { currentUser } = useAuth();
    return (
        <Box>
            <Grid
                justifyContent="center"
                templateColumns={{
                    base: "1fr",
                    md: "repeat(2, minmax(auto, 350px))",
                    lg: "repeat(3, 1fr)",
                }}
                gap="20px"
            >
                <NewsCard {...cardData} />
                <NewsCard {...cardData} />
                <NewsCard {...cardData} />
            </Grid>
        </Box>
    );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
    return {
        props: {
            data: "",
        },
    };
};
