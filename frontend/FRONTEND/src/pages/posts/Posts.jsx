import React from "react";
import {ListaDePublicaciones} from '../../components/comprador/ListaDePublicaciones';
import {PublicacionesHome } from '../../components/vendedor/PublicacionesHome';

export const Posts = () => {
    return (
        <div>
            <h1>Posts</h1>
            {/* { user.role === 'comprador' ? */}
             {/* <ListaDePublicaciones /> : */}
              <PublicacionesHome />
            {/* } */}
        </div>
    );
};

export default Posts;