import { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { getForosApi } from "@/api/foros";
import styled from "styled-components";
import type { ForumPost } from "@/api/foros";
import ForumPostCard from "./ForumPostCard";

export interface ForumsListRef {
  reload: () => void;
}

const ForumsList = forwardRef<ForumsListRef, { onRefreshed?: () => void }>(
  (props, ref) => {
    const [posts, setPosts] = useState<ForumPost[]>([]);

    const load = () => {
      getForosApi().then(setPosts);
      if (props.onRefreshed) props.onRefreshed();
    };

    useImperativeHandle(ref, () => ({ reload: load }), []);

    useEffect(() => {
      load();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <>
        <p style={{ fontWeight: "bold", marginBottom: 16 }}>
          Total de foros: {posts.length}
        </p>
        <Stack>
          {posts.map((p) => (
            <ForumPostCard key={p.id} post={p} />
          ))}
        </Stack>
      </>
    );
  }
);

export default ForumsList;

const Stack = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing(5)};
`;
