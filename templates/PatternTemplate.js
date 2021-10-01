import { MDXRemote } from "next-mdx-remote";
import ProseWrapper from "../components/mdx/ProseWrapper";
import Link from "next/link";
import styled from "styled-components";
import { breakpoints } from "../utils/breakpoints";
import Layout from "../components/Layout";
import { Title1 } from "../components/Typography";
import BackHoverLink from "../components/links/BackHoverLink";

export default function PatternTemplate({ source, frontMatter, components }) {
    function formattedDate(date) {
        return new Date(date).toLocaleDateString("en-GB", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    }

    return (
        <Layout>
            <HeaderSection>
                <div>
                    <Link href="/patterns">
                        <BackHoverLink href="/patterns">Patterns</BackHoverLink>
                    </Link>
                </div>
                <Title1>{frontMatter.title}</Title1>
                {frontMatter.description && <p>{frontMatter.description}</p>}
                <Metadata style={{ display: "flex", flexDirection: "row" }}>
                    {frontMatter.topics && (
                        <ul>
                            {frontMatter.topics.map((topic) => (
                                <li key={topic}>
                                    <Link href={`/topics/${topic}`}>
                                        <a>{topic}</a>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                    <div className="metadata">
                        {frontMatter.startDate && (
                            <span>
                                Planted {formattedDate(frontMatter.startDate)}
                            </span>
                        )}
                        {frontMatter.updated && (
                            <span>
                                Last tended {formattedDate(frontMatter.updated)}
                            </span>
                        )}
                    </div>
                </Metadata>
            </HeaderSection>
            <StyledMain>
                <ProseWrapper>
                    <MDXRemote {...source} components={components} />
                </ProseWrapper>
            </StyledMain>
        </Layout>
    );
}

const HeaderSection = styled.header`
    max-width: 1400px;
    margin: 0 auto;
    div:first-child {
        a {
            font-family: var(--font-sans);
            font-size: var(--font-size-xs);
            text-transform: uppercase;
            letter-spacing: 0.05em;
            font-weight: bold;
        }
    }
    h1 {
        font-size: var(--font-size-3xl);
        line-height: var(--leading-tight);
        border-right: 1px solid black;
        @media ${breakpoints.mediaSM} {
            font-size: var(--font-size-xl);
        }
    }

    @media ${breakpoints.mediaSM} {
        padding: 0 var(--space-16);
    }
`;

const Metadata = styled.div`
    justify-content: space-between;
    div {
        margin-top: var(--space-16);
        display: flex;
        flex-direction: column;
        text-align: right;
    }
    ul {
        list-style: none;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        max-width: 70%;
        padding: 0;
        margin-top: var(--space-16);
        li {
            margin-right: var(--space-16);
            margin-bottom: var(--space-4);
            font-family: var(--font-sans);
            font-size: var(--font-size-sm);
        }
    }
`;

const StyledMain = styled.main`
    margin-top: var(--space-16);
    padding: var(--space-80) 0 var(--space-128);
    background: white;
    border-radius: var(--border-radius-sm);
    grid-column: 1/4 !important;
    width: 100%;
    @media ${breakpoints.mediaSM} {
        padding: var(--space-80) var(--space-16);
    }
`;
