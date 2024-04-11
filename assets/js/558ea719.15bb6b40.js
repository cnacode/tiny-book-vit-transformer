"use strict";(self.webpackChunkendlessq=self.webpackChunkendlessq||[]).push([[2238],{4465:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>p,contentTitle:()=>h,default:()=>_,frontMatter:()=>l,metadata:()=>c,toc:()=>u});var s=i(4848),t=i(8453);const o='class ViTModel(ViTPreTrainedModel):\n    def __init__(self, config: ViTConfig, add_pooling_layer: bool = True, use_mask_token: bool = False):\n        super().__init__(config)\n        self.config = config\n\n        self.embeddings = ViTEmbeddings(config, use_mask_token=use_mask_token)\n        self.encoder = ViTEncoder(config)\n\n        self.layernorm = nn.LayerNorm(config.hidden_size, eps=config.layer_norm_eps)\n        self.pooler = ViTPooler(config) if add_pooling_layer else None\n\n        # Initialize weights and apply final processing\n        self.post_init()\n\n    def get_input_embeddings(self) -> ViTPatchEmbeddings:\n        return self.embeddings.patch_embeddings\n\n    def _prune_heads(self, heads_to_prune: Dict[int, List[int]]) -> None:\n        """\n        Prunes heads of the model. heads_to_prune: dict of {layer_num: list of heads to prune in this layer} See base\n        class PreTrainedModel\n        """\n        for layer, heads in heads_to_prune.items():\n            self.encoder.layer[layer].attention.prune_heads(heads)\n\n    @add_start_docstrings_to_model_forward(VIT_INPUTS_DOCSTRING)\n    @add_code_sample_docstrings(\n        checkpoint=_CHECKPOINT_FOR_DOC,\n        output_type=BaseModelOutputWithPooling,\n        config_class=_CONFIG_FOR_DOC,\n        modality="vision",\n        expected_output=_EXPECTED_OUTPUT_SHAPE,\n    )\n    def forward(\n        self,\n        pixel_values: Optional[torch.Tensor] = None,\n        bool_masked_pos: Optional[torch.BoolTensor] = None,\n        head_mask: Optional[torch.Tensor] = None,\n        output_attentions: Optional[bool] = None,\n        output_hidden_states: Optional[bool] = None,\n        interpolate_pos_encoding: Optional[bool] = None,\n        return_dict: Optional[bool] = None,\n    ) -> Union[Tuple, BaseModelOutputWithPooling]:\n        r"""\n        bool_masked_pos (`torch.BoolTensor` of shape `(batch_size, num_patches)`, *optional*):\n            Boolean masked positions. Indicates which patches are masked (1) and which aren\'t (0).\n        """\n        output_attentions = output_attentions if output_attentions is not None else self.config.output_attentions\n        output_hidden_states = (\n            output_hidden_states if output_hidden_states is not None else self.config.output_hidden_states\n        )\n        return_dict = return_dict if return_dict is not None else self.config.use_return_dict\n\n        if pixel_values is None:\n            raise ValueError("You have to specify pixel_values")\n\n        # Prepare head mask if needed\n        # 1.0 in head_mask indicate we keep the head\n        # attention_probs has shape bsz x n_heads x N x N\n        # input head_mask has shape [num_heads] or [num_hidden_layers x num_heads]\n        # and head_mask is converted to shape [num_hidden_layers x batch x num_heads x seq_length x seq_length]\n        head_mask = self.get_head_mask(head_mask, self.config.num_hidden_layers)\n\n        # TODO: maybe have a cleaner way to cast the input (from `ImageProcessor` side?)\n        expected_dtype = self.embeddings.patch_embeddings.projection.weight.dtype\n        if pixel_values.dtype != expected_dtype:\n            pixel_values = pixel_values.to(expected_dtype)\n\n        embedding_output = self.embeddings(\n            pixel_values, bool_masked_pos=bool_masked_pos, interpolate_pos_encoding=interpolate_pos_encoding\n        )\n\n        encoder_outputs = self.encoder(\n            embedding_output,\n            head_mask=head_mask,\n            output_attentions=output_attentions,\n            output_hidden_states=output_hidden_states,\n            return_dict=return_dict,\n        )\n        sequence_output = encoder_outputs[0]\n        sequence_output = self.layernorm(sequence_output)\n        pooled_output = self.pooler(sequence_output) if self.pooler is not None else None\n\n        if not return_dict:\n            head_outputs = (sequence_output, pooled_output) if pooled_output is not None else (sequence_output,)\n            return head_outputs + encoder_outputs[1:]\n\n        return BaseModelOutputWithPooling(\n            last_hidden_state=sequence_output,\n            pooler_output=pooled_output,\n            hidden_states=encoder_outputs.hidden_states,\n            attentions=encoder_outputs.attentions,\n        )';function a(e){const n={code:"code",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...(0,t.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)(n.p,{children:["The ",(0,s.jsx)(n.code,{children:"ViTModel"})," class serves as the cornerstone of the Vision Transformer architecture. This class embodies the adaptation of the transformer model for visual tasks. Let\u2019s explore the ",(0,s.jsx)(n.code,{children:"ViTModel"})," class and understand how it integrates its various components."]}),"\n",(0,s.jsx)(n.p,{children:"This is a comprehensive class that encapsulates the entire process of transforming an input image into a meaningful representation for downstream tasks such as image classification or object detection."}),"\n",(0,s.jsxs)(n.p,{children:["In previous sections I mentioned that at its heart, the ",(0,s.jsx)(n.code,{children:"ViTModel"})," operates on the principle of viewing an image as a sequence of patches and applying the transformer mechanism to these sequences. Absolutely, we can extend your writing by going through the ",(0,s.jsx)(n.code,{children:"ViTModel"})," class line by line, explaining the functionality and significance of each part. Let's dive in:"]}),"\n",(0,s.jsxs)(n.h2,{id:"the-vitmodel-class",children:["The ",(0,s.jsx)(n.code,{children:"ViTModel"})," Class"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-python",children:"class ViTModel(ViTPreTrainedModel):\n    def __init__(self, config: ViTConfig, add_pooling_layer: bool = True, use_mask_token: bool = False):\n        super().__init__(config)\n        self.config = config\n"})}),"\n",(0,s.jsxs)(n.p,{children:["The ",(0,s.jsx)(n.code,{children:"ViTModel"})," class is derived from ",(0,s.jsx)(n.code,{children:"ViTPreTrainedModel"}),", which is an abstract class that handles weights initialization and loading of pretrained models. We'll go over it later in this quest."]}),"\n",(0,s.jsxs)(n.p,{children:["The ",(0,s.jsx)(n.code,{children:"__init__"})," method initializes the ",(0,s.jsx)(n.code,{children:"ViTModel"})," instance. It is a constructor that takes a configuration object ",(0,s.jsx)(n.code,{children:"ViTConfig"}),". This config object contains all the parameters required for the model. The flexibility to add a pooling layer or use a mask token is provided through optional parameters."]}),"\n",(0,s.jsxs)(n.p,{children:["We'll go over the initialized dependencies and the forward method of the ",(0,s.jsx)(n.code,{children:"ViTModel"})," class to understand how the model processes input images. Later in next sections, I'll explain each of these components in detail."]}),"\n",(0,s.jsx)(n.h2,{id:"embeddings-layer-initialization",children:"Embeddings Layer Initialization"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-python",children:"self.embeddings = ViTEmbeddings(config, use_mask_token=use_mask_token)\n"})}),"\n",(0,s.jsxs)(n.p,{children:["The embeddings layer ",(0,s.jsx)(n.code,{children:"ViTEmbeddings"})," is where the image is decomposed into patches, and each patch is embedded into a higher-dimensional space."]}),"\n",(0,s.jsxs)(n.p,{children:["Whether to include a mask token, used in certain training scenarios like masked image modeling, is controlled by the ",(0,s.jsx)(n.code,{children:"use_mask_token"})," flag."]}),"\n",(0,s.jsx)(n.h2,{id:"encoder-initialization",children:"Encoder Initialization"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-python",children:"self.encoder = ViTEncoder(config)\n"})}),"\n",(0,s.jsxs)(n.p,{children:["The ",(0,s.jsx)(n.code,{children:"ViTEncoder"}),", consisting of multiple layers of the transformer model, is initialized here. The encoder is responsible for processing the sequence of embedded patches through self-attention mechanisms."]}),"\n",(0,s.jsx)(n.h2,{id:"layer-normalization-and-pooling",children:"Layer Normalization and Pooling"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-python",children:"self.layernorm = nn.LayerNorm(config.hidden_size, eps=config.layer_norm_eps)\nself.pooler = ViTPooler(config) if add_pooling_layer else None\n"})}),"\n",(0,s.jsxs)(n.p,{children:["A layer normalization ",(0,s.jsx)(n.code,{children:"nn.LayerNorm"})," is applied to the output of the encoder. This is crucial for stabilizing the training process and accelerating convergence."]}),"\n",(0,s.jsxs)(n.p,{children:["The ",(0,s.jsx)(n.code,{children:"ViTPooler"})," is an optional component that can be added to the model. It processes the first token's output (corresponding to the CLS token) to be used in tasks such as classification."]}),"\n",(0,s.jsx)(n.h2,{id:"model-weights-initialization",children:"Model Weights Initialization"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-python",children:"self.post_init()\n"})}),"\n",(0,s.jsxs)(n.p,{children:["This call initializes the model weights properly. It\u2019s a part of the ",(0,s.jsx)(n.code,{children:"PreTrainedModel"})," that the ",(0,s.jsx)(n.code,{children:"ViTModel"})," inherited in the beginning of this section, so after this line the model starts with suitable weights for training."]}),"\n",(0,s.jsx)(n.h2,{id:"forward-method",children:"Forward Method"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-python",children:"def forward(\n    self,\n    pixel_values: Optional[torch.Tensor] = None,\n    ...\n) -> Union[Tuple, BaseModelOutputWithPooling]:\n"})}),"\n",(0,s.jsxs)(n.p,{children:["The ",(0,s.jsx)(n.code,{children:"forward"})," method is where the actual processing of the input data (pixel values of the image) happens. It sequentially passes data through the embeddings, encoder, layer normalization, and pooler (if present)."]}),"\n",(0,s.jsx)(n.p,{children:"It takes in the image tensor (pixel values) and optionally other parameters like masks for attention heads, boolean flags for outputting attentions or hidden states, and a flag for return type."}),"\n",(0,s.jsx)(n.h2,{id:"processing-in-forward-method",children:"Processing in Forward Method"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-python",children:"embedding_output = self.embeddings(\n    pixel_values, bool_masked_pos=bool_masked_pos, interpolate_pos_encoding=interpolate_pos_encoding\n)\nencoder_outputs = self.encoder(\n    embedding_output, head_mask=head_mask, output_attentions=output_attentions, ...\n)\n"})}),"\n",(0,s.jsxs)(n.p,{children:["Inside the ",(0,s.jsx)(n.code,{children:"forward"})," method, the image is first passed through the embedding layer, and then the output of this layer is passed through the encoder. The embeddings layer converts the pixel values into a format suitable for the transformer, while the encoder processes these embeddings using self-attention."]}),"\n",(0,s.jsx)(n.h2,{id:"output-of-the-model",children:"Output of the Model"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-python",children:"sequence_output = encoder_outputs[0]\nsequence_output = self.layernorm(sequence_output)\npooled_output = self.pooler(sequence_output) if self.pooler is not None else None\n"})}),"\n",(0,s.jsx)(n.p,{children:"The output from the encoder is then normalized using layer normalization. After that, if a pooling layer is present, it processes the first token's output for tasks like classification."}),"\n",(0,s.jsxs)(n.p,{children:["At the end of its processing, the ",(0,s.jsx)(n.code,{children:"forward"})," method returns the processed output which can be utilized for downstream tasks like image classification or masked image modeling."]}),"\n",(0,s.jsxs)(n.h2,{id:"the-vitconfig-class",children:["The ",(0,s.jsx)(n.code,{children:"ViTConfig"})," Class"]}),"\n",(0,s.jsx)(n.p,{children:"I held this part to the end of the explanation to make it easier to understand. The last component to go over the configuration that ViT accepts."}),"\n",(0,s.jsxs)(n.p,{children:["This class is defining and storing these configuration parameters for the model. It is defined as a subclass of ",(0,s.jsx)(n.code,{children:"PretrainedConfig"}),", which means it inherits methods and attributes from the base configuration class used for all pre-trained models in Hugging Face's Transformers library."]}),"\n",(0,s.jsx)(n.p,{children:"This, I presume, is some sort of standardization to ensure consistency across different models:\nLet's go over these parameters that the constructor of ViTConfig takes. These parameters will make more sense as we go through the architecture of the model:"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"hidden_size"}),": This parameter sets the size of the hidden layers in the Transformer. It's a key factor in determining the model's capacity."]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"num_hidden_layers"}),": This defines the depth of the Transformer, i.e., how many layers it has."]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"num_attention_heads"}),": In each Transformer layer, multi-head attention mechanisms are used. This parameter defines how many such heads are in each layer."]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"intermediate_size"}),': The size of the "intermediate" layer in each Transformer block. This is typically larger than ',(0,s.jsx)(n.code,{children:"hidden_size"})," and allows the model to capture more complex features."]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"hidden_act"}),': The activation function used in the hidden layers. Common options include "gelu", "relu", and others.']}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"hidden_dropout_prob"})," & ",(0,s.jsx)(n.code,{children:"attention_probs_dropout_prob"}),": These define the dropout probabilities for the fully connected layers and attention probabilities, respectively. Dropout is a regularization technique to prevent overfitting."]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"initializer_range"}),": Sets the standard deviation for the truncated_normal_initializer, affecting how the model weights are initially set."]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"layer_norm_eps"}),": The epsilon value used for layer normalization, to prevent division by zero."]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"image_size"}),": The size of the input images."]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"patch_size"}),": The size of each image patch. The image is divided into patches of this size."]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"num_channels"}),": Number of channels in the input images, typically 3 for RGB images."]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"qkv_bias"}),": Determines whether to add a bias to the query, key, and value projections in the attention mechanism."]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"encoder_stride"}),": Used in the decoder for masked image modeling, indicating the factor for increasing spatial resolution."]}),"\n"]}),"\n"]})]})}function d(e={}){const{wrapper:n}={...(0,t.R)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(a,{...e})}):a(e)}var r=i(1432);const l={title:"The Main Class",hide_table_of_contents:!0},h=void 0,c={id:"vision-transformer/vit-model",title:"The Main Class",description:"",source:"@site/docs/vision-transformer/2-vit-model.mdx",sourceDirName:"vision-transformer",slug:"/vision-transformer/vit-model",permalink:"/endlessq/docs/vision-transformer/vit-model",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:2,frontMatter:{title:"The Main Class",hide_table_of_contents:!0},sidebar:"tutorialSidebar",previous:{title:"Model Structure",permalink:"/endlessq/docs/vision-transformer/model-structure"},next:{title:"ViT for Masked Image Modeling",permalink:"/endlessq/docs/vision-transformer/masked-modeling"}},p={},u=[{value:"The <code>ViTModel</code> Class",id:"the-vitmodel-class",level:2},{value:"Embeddings Layer Initialization",id:"embeddings-layer-initialization",level:2},{value:"Encoder Initialization",id:"encoder-initialization",level:2},{value:"Layer Normalization and Pooling",id:"layer-normalization-and-pooling",level:2},{value:"Model Weights Initialization",id:"model-weights-initialization",level:2},{value:"Forward Method",id:"forward-method",level:2},{value:"Processing in Forward Method",id:"processing-in-forward-method",level:2},{value:"Output of the Model",id:"output-of-the-model",level:2},{value:"The <code>ViTConfig</code> Class",id:"the-vitconfig-class",level:2}];function m(e){return(0,s.jsxs)("div",{className:"two-columns left-bigger",children:[(0,s.jsx)("div",{className:"class-source-code",children:(0,s.jsx)(r.A,{language:"python",showLineNumbers:!0,children:o})}),(0,s.jsx)("div",{children:(0,s.jsx)(d,{})})]})}function _(e={}){const{wrapper:n}={...(0,t.R)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(m,{...e})}):m()}}}]);