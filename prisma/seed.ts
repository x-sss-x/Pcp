import { Prisma, PrismaClient, company, post, user } from "@prisma/client";

const client = new PrismaClient();


const getUsers = (viewedBy: company[]): Prisma.userCreateInput[] => [
    {
        email: "test@gmail.com",
        "name": "steve",
        "password": "123",
        "contactNumber": 99876543,
        "bio": "test",
        "address": "Bangalore",
        viewedBy: { connect: { id: viewedBy[0].id } }
    },

    {
        email: "test1@gmail.com",
        "name": "bob",
        "password": "231",
        "contactNumber": 10293847,
        "bio": "test1",
        "address": "Bangalore",
        viewedBy: { connect: { id: viewedBy[1].id } }
    },

    {
        email: "test2@gmail.com",
        "name": "harry",
        "password": "321",
        "contactNumber": 99876503,
        "bio": "test2",
        "address": "Bangalore",
        viewedBy: { connect: { id: viewedBy[0].id } }
    }
];

const getPosts = (users: user[], ngo: company[]): Prisma.postCreateInput[] => [
    {
        author: { connect: { id: users[0].id } },
        LikedBy: { connect: { id: ngo[0].id } },
        title: "title post 1",
        content: "content post 1",
    },

    {
        author: { connect: { id: users[1].id } },
        LikedBy: { connect: { id: ngo[1].id } },
        title: "title post 2",
        content: "content post 2"
    }
];

const getComments = (users: user[], posts: post[], ngo: company[]): Prisma.commentCreateInput[] => [
    {
        creator: { connect: { id: users[0].id } },
        posts: { connect: { id: posts[0].id } },
        ngo: { connect: { id: ngo[0].id } },
        comments: "comment 1"
    },

    {
        creator: { connect: { id: users[1].id } },
        posts: { connect: { id: posts[1].id } },
        ngo: { connect: { id: ngo[1].id } },
        comments: "comment 2"
    }
];

const getNgo = (): Prisma.companyCreateInput[] => [
    {
        "name": "AMD",
        email: "AMD@gmail.com",
        "password": "1234",
        "contactNumber": 87615225,
        "bio": "We make the best proeccesor",
        "address": "Bangalore"
    },

    {
        "name": "ACCESS",
        email: "access@gmail.com",
        "password": "12345",
        "contactNumber": 83456745,
        "bio": "We have a unique education system and learning techniques",
        "address": "Bangalore"
    }
];

const getJobs = (users: user[], ngo: company[]): Prisma.jobOfferCreateInput[] => [
    {         
        "profession": "Front-end developer",    
        "skills": "Reactjs, Redux, HTML, CSS, Javascript",        
        "transportation": "Provided",
        "time" : "9:00 AM",          
        "location":"Bangalore",      
        "salary": 45000,       
        "description":"Job description",
        savedBy: {connect: {id: users[0].id}},
        ngo:{connect:{id: ngo[0].id}}
    },

    {         
        "profession": "Front-end developer",    
        "skills": "Reactjs, Redux, HTML, CSS, Javascript",        
        "transportation": "Provided",
        "time" : "9:00 AM",          
        "location":"Bangalore",      
        "salary": 45000,       
        "description":"Job description",
        savedBy: {connect: {id: users[1].id}},
        ngo:{connect:{id: ngo[1].id}}
    }
];

const main = async()=>{
const ngos = await Promise.all
    (getNgo().map
        (company => client.company.create
            (
                {
                    data: company
                }
            )
        )
    );
    const users = await Promise.all
        (getUsers(ngos).map
            (user => client.user.create
                (
                    {
                        data: user
                    }
                )
            )
        );

    const posts = await Promise.all
        (getPosts(users, ngos).map
            (post => client.post.create
                (
                    {
                        data: post
                    }
                )
            )
        );

    const comments = await Promise.all
        (getComments(users, posts, ngos).map
            (comment => client.comment.create
                (
                    {
                        data: comment
                    }
                )
            )
        );

        const Jobs = await Promise.all
        (getJobs(users, ngos).map
            (jobOffer => client.jobOffer.create
                (
                    {
                        data: jobOffer
                    }
                )
            )
        );
};



main();