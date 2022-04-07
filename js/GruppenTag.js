class GruppenTag extends React.Component {

  /**
   *Constructor in dem die props und der Status abgerufen werden
   * @param props
   */

  constructor(props) {
    super(props);
    this.state = {
      aufgeklappt: true
    }
  }

  /**
   * Funktion für Artikel Entfernen
   *
   * @param artikelNamen
   */

  artikelEntfernen = (artikelNamen) => {

    this.props.gruppe.artikelEntfernen(artikelNamen)
    this.props.aktiveGruppeHandler(this.props.gruppe.id)
  }


  /**
   * Funktion für Auf- und Zuklappen
   */

  aufZuKlappen() {
    this.setState({aufgeklappt: !this.state.aufgeklappt})
  }

  render = () => {
    let itemsRelevant = this.props.gruppe.artikelListe.filter(item => item.gekauft === this.props.erledigt)


    return (
       <div>
         <dt

            /* Anzeigen der Gruppen in beiden Kategorien Erledigt und Einkaufen */

            className={this.props.aktiv && !this.props.erledigt ? "aktiv" : "inaktiv"}
            onClick={() => !this.props.erledigt ? this.props.aktiveGruppeHandler(this.props.gruppe.id) : ``}>
           {this.props.gruppe.name}
           {this.props.erledigt ? '' :

              /* On Click Funktion für das auf- und zuklappen mit Icon Änderung */

              <i onClick={() => this.aufZuKlappen()} className="material-icons">
                {this.state.aufgeklappt ? 'expand_more' : 'expand_less'}
              </i>}

         </dt>

         {/* Entfernen von Artikeln aus der Liste */}

         {this.state.aufgeklappt ?
            itemsRelevant.map(artikel => (
               <ArtikelTag key={artikel.id} artikel={artikel} deleteHandler={this.artikelEntfernen}
                           checkHandler={this.props.checkHandler}
               />
            )) : ''}


       </div>
    )
  }
}

