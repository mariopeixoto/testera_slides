// Import React
import React from "react";

// Import Spectacle Core tags
import {
  Appear,
  BlockQuote,
  Cite,
  CodePane,
  Deck,
  Fill,
  Heading,
  Image,
  Layout,
  Link,
  ListItem,
  List,
  Markdown,
  Quote,
  Slide,
  Spectacle,
  Text,
  Fit
} from "spectacle";
import CodeSlide from "spectacle-code-slide";

// Import image preloader util
import preloader from "spectacle/lib/utils/preloader";

// Import theme
import createTheme from "spectacle/lib/themes/default";

// Import custom component
import Interactive from "../assets/interactive";

// Require CSS
require("normalize.css");
require("spectacle/lib/themes/default/index.css");

import './index.css';


const images = {
  flow: require("../assets/flow.png"),
  results: require("../assets/results.png")
};

preloader(images);

const theme = createTheme({
  primary: "#f9e037",
  disabled: "#bfbfbf"
});


class Outline extends React.Component {

  constructor() {
    super();
    this._renderItem = this._renderItem.bind(this);
    this._isItemActive = this._isItemActive.bind(this);
  }

  _renderItem(text, key) {
    if (this._isItemActive(key)) {
      return (<ListItem>{text}</ListItem>);
    } else {
      return (<ListItem textColor="disabled">{text}</ListItem>);
    }
  }

  _isItemActive(key) {
    return (this.props.active == undefined || this.props.active === key);
  }

  render() {
    return (
        <Fit>
          <Heading textColor="black">
            Outline
          </Heading>
          <List>
            {this._renderItem('Motivation', 'motivation')}
            {this._renderItem('Brief Description', 'description')}
            {this._renderItem('Alloy (Basic Syntax, State Mutation, Analyzer)', 'alloy')}
            {this._renderItem('Implementation', 'implementation')}
            {this._renderItem('Evaluation', 'evaluation')}
            {this._renderItem('Limitations & Future Work', 'limitations')}
          </List>
        </Fit>
    );
  }
}

class GroupSymbol extends React.Component {
  render() {
    return (
      <div className="group">
        <div>&nbsp;</div>
        <div>&nbsp;</div>
      </div>
    );
  }
}

class GroupedItem extends React.Component {
  render() {
    return (
      <Layout>
        <Fill>
          {this.props.children}
        </Fill>
        <Fill>
          <Layout>
            <GroupSymbol/>
            <Text style={this.props.noteStyle}>{this.props.note}</Text>
          </Layout>
        </Fill>
      </Layout>
    );
  }
}

class SubListItem extends React.Component {
  render() {
    return (<ListItem {...this.props} padding="0px 0px 0px 50px">{this.props.children}</ListItem>);
  }
}

export default class Presentation extends React.Component {
  render() {
    return (
      <Spectacle theme={theme}>
        <Deck transition={["none"]}>
          <Slide bgColor="primary" notes="">
            <Heading size={4} lineHeight={1} textColor="black">
              TestEra: Specification-based Testing of Java Programs Using SAT
            </Heading>
            <Text textSize="1em" margin="20px 0px 0px" bold>Mario Peixoto (@mariopeixoto)</Text>
            <Text textSize="1em" margin="20px 0px 0px" bold>https://github.com/mariopeixoto/testera_slides</Text>
          </Slide>
          <Slide>
            <Outline />
          </Slide>
          <Slide>
            <Outline active="motivation"/>
          </Slide>
          <Slide>
            <Fit>
              <Heading textColor="black">Motivation</Heading>
              <List>
                <ListItem>
                  High cost for testing
                </ListItem>
                <GroupedItem note="Labor intensive proc." noteStyle={{lineHeight: "108px"}}>
                  <List>
                    <SubListItem>Manual testing</SubListItem>
                    <SubListItem>Test data generation</SubListItem>
                  </List>
                </GroupedItem>
              </List>
            </Fit>
          </Slide>
          <Slide>
            <Fit>
              <Heading textColor="black">Motivation</Heading>
              <List>
                <ListItem>
                  Automated testing can:
                </ListItem>
                <List>
                  <SubListItem>Reduce cost of development</SubListItem>
                  <SubListItem>Reduce cost of maintenance</SubListItem>
                  <SubListItem>Increase productivity</SubListItem>
                </List>
              </List>
            </Fit>
          </Slide>
          <Slide>
            <Outline active="description"/>
          </Slide>
          <Slide>
            <Fit>
              <Heading textColor="black">Brief description</Heading>
              <List>
                <ListItem>Framework for automated specification-based testing</ListItem>
                <ListItem>Inputs:</ListItem>
                <List>
                  <SubListItem>Java Method</SubListItem>
                  <SubListItem>Formal specification of pre- and post-conditions</SubListItem>
                  <SubListItem>A bound that limits the size of test cases</SubListItem>
                </List>
                <ListItem>Generates all nonisomorphic inputs (up to the supplied bound)</ListItem>
                <ListItem>Executes the method for each generated input</ListItem>
                <ListItem>Checks the output against the post-condition for correctness</ListItem>
              </List>
            </Fit>
          </Slide>
          <Slide>
            <Heading textColor="black">TestEra flow</Heading>
            <Image src={images.flow} width="100%"></Image>
          </Slide>
          <Slide>
            <Outline active="alloy"/>
          </Slide>
          <Slide>
            <Heading textColor="black">Alloy</Heading>
            <List>
              <ListItem>Strong typed language</ListItem>
              <ListItem>Pre- and post-conditions specification</ListItem>
              <ListItem>Analyzer - SAT (boolean satisfaction problem)</ListItem>
              <List>
                <SubListItem>Generating input from spec.</SubListItem>
                <SubListItem>Checking the input/output for correctness</SubListItem>
              </List>
            </List>
          </Slide>
          <Slide>
            <Heading textColor="black">Basic Syntax</Heading>
            <Heading size={6} textColor="black">Signature</Heading>
            <CodePane
                lang="java"
                source={require("raw!./code/signature.alloy")}
                margin="20px auto"
              />
          </Slide>
          <Slide>
            <Heading textColor="black">Basic Syntax</Heading>
            <Heading size={6} textColor="black">Relations, Expressions and Formulas</Heading>
            <List>
              <ListItem>Any expression evaluates to a relation</ListItem>
              <ListItem>Each element of a tuple is atomic and belongs to some basic type</ListItem>
              <ListItem>Relations are typed</ListItem>
              <ListItem>Sets are unary relations</ListItem>
            </List>
          </Slide>
          <Slide>
            <Heading textColor="black">Basic Syntax</Heading>
            <Heading size={6} textColor="black">Relations, Expressions and Formulas</Heading>
            <List>
              <ListItem>Binary operators:</ListItem>
              <List>
                <SubListItem>+ (union)</SubListItem>
                <SubListItem>& (intersection)</SubListItem>
                <SubListItem>- (difference)</SubListItem>
                <SubListItem>. and :: (composition)</SubListItem>
              </List>
            </List>
          </Slide>
          <Slide>
            <Heading textColor="black">Basic Syntax</Heading>
            <Heading size={6} textColor="black">Relations, Expressions and Formulas</Heading>
            <List>
              <ListItem>Unary operators:</ListItem>
              <List>
                <SubListItem>~ (transpose)</SubListItem>
                <SubListItem>^ (transitive closure)</SubListItem>
                <SubListItem>* (reflexive transitive closure)</SubListItem>
              </List>
            </List>
          </Slide>
          <Slide>
            <Heading textColor="black">Basic Syntax</Heading>
            <Heading size={6} textColor="black">Relations, Expressions and Formulas</Heading>
            <List>
              <ListItem>Quantifiers turns expressions into formulas</ListItem>
            </List>
            <CodePane
                lang="java"
                source={require("raw!./code/formulas.alloy")}
                margin="20px auto"
              />
          </Slide>
          <Slide>
            <Heading textColor="black">Basic Syntax</Heading>
            <Heading size={6} textColor="black">Functions</Heading>
            <List>
              <ListItem>A function is a parameterized formula that can be "invoked" elsewhere</ListItem>
              <ListItem>A Fact is formula that takes no arguments and is always true</ListItem>
              <ListItem>An Assertion is formula whose the correctness needs to be checked</ListItem>
            </List>
            <CodePane
                lang="java"
                source={require("raw!./code/functions.alloy")}
                margin="20px auto" />
          </Slide>
          <Slide>
            <Heading textColor="black">State Mutation</Heading>
            <List>
              <ListItem>Alloy does not have a built in notion of state mutation</ListItem>
            </List>
            <CodePane
                lang="java"
                source={require("raw!./code/state.alloy")}
                margin="20px auto" />
          </Slide>
          <Slide>
            <Heading textColor="black">Analyzer</Heading>
            <List>
              <ListItem>Automatic tool for analyzing models created in Alloy</ListItem>
              <ListItem>Inputs: formula, scope (a bound on the number of atoms in the universe)</ListItem>
              <ListItem>Outputs: instances (an assignment of values to the sets and relations that makes the formula true)</ListItem>
            </List>
          </Slide>
          <Slide notes="acyclic list">
            <Heading textColor="black">Example</Heading>
            <CodePane
                lang="java"
                source={require("raw!./code/list.java")}
                margin="20px auto" />
          </Slide>
          <CodeSlide transition={[]}
              lang="java"
              code={require("raw!./code/list.alloy")}
              ranges={[
                { loc: [0, 34], title: "List Specification" },
                { loc: [0, 3], title: "State" },
                { loc: [4, 12], title: "List" },
                { loc: [13, 18], title: "Pre-condition" },
                { loc: [19, 34], title: "Post-condition" },
                { loc: [21, 23], title: "Post-condition" },
                { loc: [24, 28], title: "Post-condition" },
                { loc: [29, 34], title: "Post-condition" },
              ]} >
          </CodeSlide>
          <Slide>
            <Outline active="implementation"/>
          </Slide>
          <Slide>
            <Heading textColor="black">TestEra flow</Heading>
            <Image src={images.flow} width="100%"></Image>
          </Slide>
          <Slide>
            <Heading textColor="black">Implementation</Heading>
            <Heading size={6} textColor="black">Alloy input spec</Heading>
              <CodePane
                  source={require("raw!./code/input_spec.impl")}
                  margin="20px auto" />
          </Slide>
          <Slide>
            <Heading textColor="black">Implementation</Heading>
            <Heading size={6} textColor="black">Alloy input spec</Heading>
            <CodePane
                lang="java"
                source={require("raw!./code/input_spec.alloy")}
                margin="20px auto" />
          </Slide>
          <Slide>
            <Heading size={6} textColor="black">Alloy input/output spec</Heading>
            <CodePane
                source={require("raw!./code/input_output_spec.impl")}
                margin="20px auto" />
          </Slide>
          <Slide>
            <Heading size={6} textColor="black">Alloy input/output spec</Heading>
            <CodePane
                source={require("raw!./code/input_output_spec.alloy")}
                margin="20px auto" />
          </Slide>
          <Slide>
            <Outline active="evaluation"/>
          </Slide>
          <Slide>
            <Heading textColor="black">Case studies</Heading>
            <List>
              <ListItem>Linked lists</ListItem>
              <ListItem>Red-Black Trees (java.util)</ListItem>
              <ListItem>Intentional Naming System</ListItem>
              <ListItem>Alloy Analyzer (alpha version)</ListItem>
            </List>
          </Slide>
          <Slide>
            <Heading textColor="black">Results</Heading>
            <Heading size={6} textColor="black">Pentium III, 700 MHz</Heading>
            <Image src={images.results} width="100%"></Image>
          </Slide>
          <Slide>
            <Outline active="limitations"/>
          </Slide>
          <Slide>
            <Heading size={4} textColor="black">Limitations & Future Work</Heading>
            <List>
              <ListItem>Ease of specification</ListItem>
              <ListItem>Primitive types</ListItem>
              <ListItem>Exceptions, arrays and multi-thread</ListItem>
              <ListItem>Inheritance</ListItem>
              <ListItem>Report code coverage</ListItem>
            </List>
          </Slide>
          <Slide>
            <Heading textColor="black">References</Heading>
            <List>
              <ListItem><Text textSize="0.7em">http://users.ece.utexas.edu/~khurshid/papers/TestEra-ASE-J.pdf</Text></ListItem>
              <ListItem><Text textSize="0.7em">https://www.doc.ic.ac.uk/project/examples/2007/271j/suprema_on_alloy/Web/</Text></ListItem>
            </List>
          </Slide>
          <Slide>
            <Heading textColor="black">Questions?</Heading>
          </Slide>
        </Deck>
      </Spectacle>
    );
  }
}
