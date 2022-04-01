class GruppenTag extends React.Component {

  artikelEntfernen = (artikelNamen) => {

    this.props.gruppe.artikelEntfernen(artikelNamen)
    this.props.aktiveGruppeHandler(this.props.gruppe.id)
  }

  render = () => {

    const erledigt = this.props.erledigt
    let itemsRelevant = this.props.gruppe.artikelListe.filter(item => item.gekauft === this.props.erledigt)


    return (
       <div>
         <dt
            className={this.props.aktiv && !this.props.erledigt ? "aktiv" : "inaktiv"}
            onClick={() => !this.props.erledigt ? this.props.aktiveGruppeHandler(this.props.gruppe.id) : ``}>
           {this.props.gruppe.name}
           
           <i className="material-icons">expand_less</i>
         </dt>
         
         {itemsRelevant.map(artikel => (
            <ArtikelTag key={artikel.id} artikel={artikel} deleteHandler={this.artikelEntfernen} checkHandler={this.props.checkHandler}
           />
           ))}
       </div>
    )
  }
}

