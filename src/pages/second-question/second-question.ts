import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';
import { MqttService, IMqttMessage } from 'ngx-mqtt';

/**
 * Generated class for the SecondQuestionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-second-question',
  templateUrl: 'second-question.html',
})
export class SecondQuestionPage {

  subscription: Subscription;
  message: string;
  animalOnShow:{name: string, url: string} // this is the animal to be shown we a messeage is received
  animals = [
    {name: 'lion', url:'https://answersafrica.com/wp-content/uploads/2013/07/African_lion_king-wide-640x400.jpg', bio: `Lion Temporal range: Pleistocene–Present PreЄЄOSDCPTJKPgN ↓ Lion (Panthera leo) (30941994012).jpg A male Southern African lion photographed in Kruger National Park, South Africa Lioness Etosha NP.jpg A Southern African lioness photographed in Etosha National Park, Namibia Conservation status Vulnerable (IUCN 3.1)[2] Scientific classification e Kingdom: Animalia Phylum: Chordata Class: Mammalia Order: Carnivora Suborder: Feliformia Family: Felidae Genus: Panthera Species: P. leo[1] Binomial name Panthera leo[1] (Linnaeus, 1758)[3] Subspecies see Subspecies Lion distribution.png Distribution of Panthera leo in Africa and Eurasia, in the past and present. Synonyms Felis leo Linnaeus, 1758 The lion (Panthera leo) is a species in the family Felidae, and a member of the genus Panthera. It exhibits a pronounced sexual dimorphism; males are larger than females with a typical weight range of 150 to 250 kg (331 to 551 lb) for the former and 120 to 182 kg (265 to 401 lb) for the latter. In addition, male lions have a prominent mane, which is the most recognisable feature of the species. Both sexes have hairy tufts at the end of their tails.`},
    {name: 'tiger', url:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsboMgzINEeuSq_cWD5_6_DAkgZDdDujhabS5PcbfrN4DM8Q56', bio: `Tiger Temporal range: early Pleistocene–Present PreЄЄOSDCPTJKPgN ↓ Royal Bengal Tiger at Kanha National Park.jpg A Bengal tiger (P. t. tigris) at Kanha National Park, India, Continental Asia Conservation status Endangered (IUCN 3.1)[1] Scientific classification e Kingdom: Animalia Phylum: Chordata Class: Mammalia Order: Carnivora Suborder: Feliformia Family: Felidae Genus: Panthera Species: P. tigris Binomial name Panthera tigris (Linnaeus, 1758) Subspecies see text Tiger map.jpg Tiger's historic range in about 1850 (pale yellow) and in 2006 (in green).[2] Synonyms Felis tigris Linnaeus, 1758[3] Tigris striatus Severtzov, 1858 Tigris regalis Gray, 1867 The tiger (Panthera tigris) is the largest cat species, most recognizable for its pattern of dark vertical stripes on reddish-orange fur with a lighter underside. The species is classified in the genus Panthera with the lion, leopard, jaguar, and snow leopard. It is an apex predator, primarily preying on ungulates such as deer and bovids`},
    {name: 'dog', url: 'https://images.pexels.com/photos/356378/pexels-photo-356378.jpeg?auto=compress&cs=tinysrgb&h=350', bio: `Domestic dog Temporal range: Late Pleistocene – Present (14,700–0 years BP) Collage of Nine Dogs.jpg Selection of the different breeds of dog Conservation status Domesticated Scientific classification e Kingdom: Animalia Phylum: Chordata Class: Mammalia Order: Carnivora Family: Canidae Genus: Canis Species: C. lupus Subspecies: C. l. familiaris[1] Trinomial name Canis lupus familiaris[1] Linnaeus, 1758 Synonyms Canis familiaris Linnaeus, 1758[2][3] Montage showing the morphological variation of the dog. The domestic dog (Canis lupus familiaris when considered as a subspecies of wolf or Canis familiaris when considered as a separate species)[4] is a member of the genus Canis (canines), which forms part of the wolf-like canids,[5] and is the most widely abundant terrestrial carnivore.[6][7][8][9][10]`}
  ]
  constructor(private _mqttService: MqttService) {
    this.subscription = this._mqttService.observe('mommy').subscribe((message: IMqttMessage) => {
      this.message = message.payload.toString();
      this.animalOnShow = this.animals.filter((animal) => {
        return animal.name == this.message.toLocaleLowerCase();
      })[0];
    });
  }



}
