A creuser.
Menu 1 seul niveau à la mode actuellement

L'astuce du surlignage avec :

.rtd-nav li > a:after {
    content: "";
    position: absolute;
    height: 2px;
    width: 100%;
    left: 0px;
    bottom: 0px;
    background-color: #EB5055;
    visibility: hidden;
    transform: scaleX(0);
    transition: all 0.1s ease 0s;
}


qui devient

.rtd-nav li>a:hover:after{
    visibility:visible;
    -webkit-transform:scaleX(1);
    -ms-transform:scaleX(1);
    transform:scaleX(1)
}

Menu déroulant à l'ancienne : http://www.frogweb.fr/menu-deroulant-horizontal/ (utile pour refaire http://www.millau-viaduc-tourisme.fr/)
Menu 1 seul niveau + lateral en mobile, optimisé CSS3 (et pas jQuery) : http://www.smashingmagazine.com/2013/01/15/off-canvas-navigation-for-responsive-website/
Menu à plusieurs niveaux en mobile : http://tympanus.net/codrops/2013/08/13/multi-level-push-menu/
Les tests flexbox CSS3 de Raphael G (tout en bas) : http://www.goetter.fr/nav/